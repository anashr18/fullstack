from typing import Literal

from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.mongodb import MongoDBSaver
import os
from dotenv import load_dotenv
from langfuse.callback import CallbackHandler
from pymongo import MongoClient
from fastapi import FastAPI, HTTPException, Query
load_dotenv() 

# @tool
# def get_weather(city: Literal["nyc", "sf"]):
#     """Use this to get weather information."""
#     if city == "nyc":
#         return "It might be cloudy in nyc"
#     elif city == "sf":
#         return "It's always sunny in sf"
#     else:
#         raise AssertionError("Unknown city")


# tools = [get_weather]
# model = ChatOpenAI(model_name="gpt-4o-mini", temperature=0)



# MONGODB_URI = "localhost:27017"  
MONGODB_URI = "mongodb://admin:password@localhost:27017/?authSource=admin"
mongodb_client = MongoClient(MONGODB_URI)
checkpointer = MongoDBSaver(mongodb_client)

langfuse_handler = CallbackHandler(session_id=100)
config = {"configurable": {"thread_id": "1"}, "callbacks": [langfuse_handler]}

# with MongoDBSaver.from_conn_string(MONGODB_URI) as checkpointer:
#     graph = create_react_agent(model, tools=tools, checkpointer=checkpointer)
#     # response = graph.invoke({"messages": [("What is my name?")]}, config)
#     input_message = "What is my name?"
#     for chunk in graph.stream({"messages": [input_message]}, config, stream_mode="values"):
#         chunk["messages"][-1].pretty_print()
# print(response)

def get_chat(user_id: str, thread_id: str):
    """Retrieve the latest checkpointed conversation using LangGraph API."""
    config = {"configurable": {"thread_id": thread_id}}
    checkpoint_tuple = checkpointer.get_tuple(config)
    
    if not checkpoint_tuple:
        raise HTTPException(status_code=404, detail="Chat not found")
    
    chat_history = checkpoint_tuple.checkpoint
    if chat_history.get("user_id") != user_id:
        raise HTTPException(status_code=403, detail="Unauthorized access to this chat")
    
    return {"thread_id": thread_id, "messages": chat_history.get("messages", [])}

# Testing with pytest
client = TestClient(app)

def test_store_chat():
    response = client.post("/store_chat/", json={
        "user_id": "test_user",
        "thread_id": "thread_1",
        "messages": [{"role": "user", "content": "Hello", "timestamp": "2025-03-04T10:00:00Z"}]
    })
    assert response.status_code == 200
    assert response.json()["message"] == "Chat stored successfully with LangGraph checkpointing"

def test_get_user_chats():
    response = client.get("/get_user_chats/?user_id=test_user")
    assert response.status_code == 200
    assert "conversations" in response.json()

def test_get_chat():
    response = client.get("/get_chat/?user_id=test_user&thread_id=thread_1")
    assert response.status_code in [200, 404]  # It should return a chat or not found
    if response.status_code == 200:
        assert "messages" in response.json()
