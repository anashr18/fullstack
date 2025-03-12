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
from agents.db_agents.query_gen_system import get_query_gen_chain
from langchain_core.messages import ToolMessage




# Define the state for the agent
class State(TypedDict):
    messages: Annotated[list[AnyMessage], add_messages]


# Define a new graph

# Add a node for the first tool call
def first_tool_call(state: State) -> dict[str, list[AIMessage]]:

  tool_call = {"name": "sql_db_list_tables",
               "args": {},
               "id": "tool_abcd123"}

  return {"messages": [AIMessage(content="", tool_calls=[tool_call])]}
  
def model_check_query(state: State) -> dict[str, list[AIMessage]]:
  """
  Use this tool to dobule-check if your query is correct before executing it.
  """
  messages = state["messages"]

  response = query_check.invoke({"messages": messages[-1:]})
  return {"messages": [response]}


def model_get_schema(state: State):
#   """Use this tool to know table names for which schema."""  
  messages = state["messages"]

  chat_with_get_schema = ChatOpenAI(model="gpt-4o-mini", temperature=0).bind_tools(
      [get_schema_tool]
  )

  return {"messages": [chat_with_get_schema.invoke(messages)]}

def query_gen_node(state: State):
  message = get_query_gen_chain().invoke(state)
  return {"messages": [message]}

# Define a conditional edge to decide whether to continue or end the workflow
def should_continue(state: State) -> Literal[END, "correct_query", "query_gen"]:
    messages = state["messages"]
    last_message = messages[-1]
    # If there is a tool call, then we finish
    if last_message.content.startswith("Answer:"):
        return END
    if last_message.content.startswith("Error:"):
        return "query_gen"
    else:
      return "correct_query"

def create_workflow():
    workflow = StateGraph(State)

    workflow.add_node("first_tool_call", first_tool_call)
    list_tables_tool = get_list_tables_tool()
    workflow.add_node(
        "list_tables", list_tables_tool)
    schema_tool = get_schema_tool()
    workflow.add_node("get_schema_tool", schema_tool)
    workflow.add_node(model_get_schema)
    workflow.add_node("query_gen", query_gen_node)

    # Add a node for the model to check the query before executing it
    workflow.add_node("correct_query", model_check_query)

    # Add node for executing the query
    workflow.add_node("execute_query", create_tool_node_with_fallback([db_query_tool]))

    workflow.add_edge(START, "first_tool_call")
    workflow.add_edge("first_tool_call", "list_tables")
    workflow.add_edge("list_tables", "model_get_schema")
    workflow.add_edge("model_get_schema", "get_schema_tool")
    workflow.add_edge("get_schema_tool", "query_gen")
    workflow.add_conditional_edges(
        "query_gen",
        should_continue,
    )
    workflow.add_edge("correct_query", "execute_query")
    workflow.add_edge("execute_query", "query_gen")

    # Compile the workflow into a runnable
    app = workflow.compile()
    return app


