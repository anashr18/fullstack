import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

from typing import Annotated
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langchain_openai import ChatOpenAI
# from .tools import get_tools  # Import tools from separate file

llm = ChatOpenAI(model="gpt-4o")
# tools = get_tools()
# llm_with_tools = llm.bind_tools(tools)

class State(TypedDict):
    messages: Annotated[list, add_messages]

def chatbot(state: State):
    return {"messages": [llm.invoke(state["messages"])]}

graph_builder = StateGraph(State)
graph_builder.add_node("chatbot", chatbot)
graph_builder.add_edge(START, "chatbot")
graph_builder.add_edge("chatbot", END)
graph = graph_builder.compile()

def stream_graph_updates(user_input: str):
    """Returns LangGraph's built-in streaming generator."""
    return graph.stream({"messages": [{"role": "user", "content": user_input}]}, stream_mode="messages")

