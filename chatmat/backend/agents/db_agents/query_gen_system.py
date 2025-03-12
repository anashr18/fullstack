from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field


# DO NOT call any tool besides SubmitFinalAnswer to submit the final answer.
# Add a node for a model to generate a query based on the question and schema
query_gen_system = """You are a SQL expert with a strong attention to detail.

You can define SQL queries, analize queries results and interpretate query results to response an answer.

Read the messages bellow and identify the user question, table schemas, query stament and query result, or error if they exists.

1. If there's no a query result that make sense to answer the question, create a syntactically correct SQLite query to answer the user question. DO NOT make any DML statements (INSERT, UPDATE, DELETE, DROP etc.) to the database.

2. If you create a query, response ONLY the query stament. For example "SELECT id, name FROM pets;"

3. If a query was already excuted, but there was an error. Response with the same error message you found. For example: "Error: Pets table doesn't exists"

4. If a query was alread excuted sucessfully interpretate the reponse and answer the question following this pattern: Answer: <<question answer>>. For example: "Answer: There three cats registered as addopted"
"""


# # Describe a tool to represent the end state
# class SubmitFinalAnswer(BaseModel):
#     """Submit the final answer to the user based on the query results."""

#     final_answer: str = Field(..., description="The final answer to the user")


def get_query_gen_chain():
    query_gen_prompt = ChatPromptTemplate.from_messages(
        [("system", query_gen_system), ("placeholder", "{messages}")]
    )
    # query_gen = query_gen_prompt | ChatOpenAI(model="gpt-4o", temperature=0).bind_tools(
    #     [SubmitFinalAnswer]
    # )
    query_gen_chain = query_gen_prompt | ChatOpenAI(model="gpt-4o", temperature=0)
    return query_gen_chain
