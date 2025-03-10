from typing import Annotated, Literal

from langchain_core.messages import AIMessage
from langchain_openai import ChatOpenAI

from pydantic import BaseModel, Field
from typing_extensions import TypedDict

from langgraph.graph import END, StateGraph, START
from langgraph.graph.message import AnyMessage, add_messages

from agents.db_agents.query_check_system import query_check
from agents.tools.tool_utils import create_tool_node_with_fallback

from agents.tools.db_tools import get_list_tables_tool, get_schema_tool, db_query_tool
from agents.db_agents.query_gen_system import query_gen
from langchain_core.messages import ToolMessage


class State(TypedDict):
    messages: list[AnyMessage]
    extra_field: int

def node(state: State):
    messages = state["messages"]
    new_message = AIMessage("Hello!")

    return {"messages": messages + [new_message], "extra_field": 10}

def create_workflow():
    workflow = StateGraph(State)
    workflow.add_node(node)
    workflow.set_entry_point("node")
    app = workflow.compile()
    return app


