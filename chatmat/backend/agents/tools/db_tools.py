
from langchain_community.agent_toolkits import SQLDatabaseToolkit
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from database.db_connection import get_db
from .tool_utils import create_tool_node_with_fallback

def get_tools():
    db = get_db()
    toolkit = SQLDatabaseToolkit(db=db, llm=ChatOpenAI(model="gpt-4o"))
    tools = toolkit.get_tools()
    return tools




def get_list_tables_tool():
    tools = get_tools()
    # print(f"get_list_table_tool {tools}")
    list_tables_tool = next(tool for tool in tools if tool.name == "sql_db_list_tables")
    list_tables = create_tool_node_with_fallback([list_tables_tool])
    return list_tables
def get_schema_tool():
    """Get the schema of tables in database"""
    tools = get_tools()
    schema_tool = next(tool for tool in tools if tool.name == "sql_db_schema")
    get_schema_tool_with_fallback = create_tool_node_with_fallback([get_schema_tool])
    return get_schema_tool_with_fallback


@tool
def db_query_tool(query: str) -> str:
    """
    Execute a SQL query against the database and get back the result.
    If the query is not correct, an error message will be returned.
    If an error is returned, rewrite the query, check the query, and try again.
    """
    db = get_db()
    result = db.run_no_throw(query)
    if not result:
        return "Error: Query failed. Please rewrite your query and try again."
    return result
    