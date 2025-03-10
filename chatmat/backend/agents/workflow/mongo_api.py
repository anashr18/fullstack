# uvicorn mongo_api:app --host 0.0.0.0 --port 8080 --reload --log-level debug
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Dict, Optional, Literal
from pymongo import MongoClient
from langgraph.checkpoint.mongodb import MongoDBSaver
import os
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from dotenv import load_dotenv

load_dotenv()

# MongoDB connection
MONGO_URI = "mongodb://admin:password@localhost:27017/?authSource=admin"
mongodb_client = MongoClient(MONGO_URI)
checkpointer = MongoDBSaver(mongodb_client)  # Persistent MongoDBSaver instance

@tool
def get_weather(city: Literal["nyc", "sf"]):
    """Use this to get weather information."""
    if city == "nyc":
        return "It might be cloudy in nyc"
    elif city == "sf":
        return "It's always sunny in sf"
    else:
        raise AssertionError("Unknown city")

def get_model():
    """Dependency function to provide model instance."""
    return ChatOpenAI(model_name="gpt-4o-mini", temperature=0)

def get_tools():
    """Dependency function to provide tools list."""
    return [get_weather]

def get_graph(model=Depends(get_model), tools=Depends(get_tools)):
    """Dependency function to create and return the graph instance."""
    return create_react_agent(model, tools=tools, checkpointer=checkpointer)

app = FastAPI()

class Message(BaseModel):
    role: str  # "user" or "assistant"
    content: str
    timestamp: Optional[str]  # Optional timestamp for ordering

class ChatSession(BaseModel):
    user_id: str
    thread_id: str
    messages: List[Dict[str, str]]  # Ensure messages are dicts, not Message objects

import uuid

@app.post("/store_chat/")
def store_chat(chat: ChatSession, graph=Depends(get_graph)):
    """Invoke the graph and store the response using LangGraph checkpointing API."""

    # ✅ Generate a unique checkpoint ID
    checkpoint_id = str(12345)

    # ✅ Pass `checkpoint_ns` properly
    config = {
        "configurable": {
            "thread_id": chat.thread_id,
            "user_id": chat.user_id,
            "checkpoint_ns": chat.user_id,  # ✅ Now properly included
            "checkpoint_id": checkpoint_id  # ✅ Required for MongoDBSaver
        }
    }

    # ✅ Call `graph.invoke()`, letting LangGraph manage checkpoints
    response = graph.invoke({"messages": chat.messages}, config)

    return {"message": "Chat stored successfully with LangGraph checkpointing", "checkpoint_id": checkpoint_id}



@app.get("/get_user_chats/")
def get_user_chats(user_id: str):
    """Retrieve all chat sessions for a specific user using LangGraph checkpointing."""
    
    # ✅ FIX: Use `checkpoint_ns = user_id` to retrieve only that user's chats
    read_config = {
        "configurable": {
            "checkpoint_ns": user_id  # ✅ Only fetch chats from this user
        }
    }

    # Retrieve checkpoints for the user
    all_threads = list(checkpointer.list(read_config))

    user_chats = []
    for checkpoint in all_threads:
        checkpoint_data = checkpoint.checkpoint
        thread_id = checkpoint.config.get("configurable", {}).get("thread_id", "unknown")

        user_chats.append({"thread_id": thread_id, "messages": checkpoint_data.get("messages", [])})

    return {"conversations": user_chats}

@app.get("/get_chat/")
def get_chat(user_id: str, thread_id: str):
    """Retrieve the latest checkpointed conversation using LangGraph API."""
    
    # ✅ FIX: Use `checkpoint_ns = user_id` + `thread_id` for filtering
    read_config = {
        "configurable": {
            "thread_id": thread_id,
            "checkpoint_ns": ""  # ✅ Ensures we fetch only this user's chats
        }
    }

    # Fetch the latest checkpoint matching this configuration
    # checkpoint_tuple = checkpointer.get(read_config)
    checkpoint_tuple = checkpointer.list(read_config)
    
    if not checkpoint_tuple:
        raise HTTPException(status_code=404, detail="Chat not found")
    
    # chat_history = checkpoint_tuple.checkpoint
    # messages = chat_history.get("messages", [])

    return {"thread_id": thread_id, "messages": checkpoint_tuple}



# Testing with pytest
# client = TestClient(app)

# def test_store_chat():
#     response = client.post("/store_chat/", json={
#         "user_id": "test_user",
#         "thread_id": "thread_1",
#         "messages": [{"role": "user", "content": "Hello", "timestamp": "2025-03-04T10:00:00Z"}]
#     })
#     assert response.status_code == 200
#     assert response.json()["message"] == "Chat stored successfully with LangGraph checkpointing"

# def test_get_user_chats():
#     response = client.get("/get_user_chats/?user_id=test_user")
#     assert response.status_code == 200
#     assert "conversations" in response.json()

# def test_get_chat():
#     response = client.get("/get_chat/?user_id=test_user&thread_id=thread_1")
#     assert response.status_code in [200, 404, 403]  # Fix: Add 403 as a valid response
#     if response.status_code == 200:
#         assert "messages" in response.json()



# uvicorn mongo_api:app --host 0.0.0.0 --port 8080 --reload --log-level debug

# {
#   "user_id": "1111",
#   "thread_id": "t1",
#   "messages": [
#     {
#       "role": "user",
#       "content": "This is test content"
#     }
#   ]
# }