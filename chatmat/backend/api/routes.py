from fastapi import APIRouter, Request
from agents.chatbot import stream_graph_updates
from agents.joke_agent import stream_joke_agent
from fastapi.responses import StreamingResponse
import asyncio
from database.db_connection import get_db
# from agents.tools.db_tools import get_list_tables_tool, get_schema_tool, db_query_tool
# from agents.workflow.workflow2 import create_workflow
from agents.workflow.workflow import create_workflow
from langchain_core.messages import HumanMessage, AIMessage
from langfuse.callback import CallbackHandler
from fastapi.responses import JSONResponse


router = APIRouter()

@router.post("/chat-stream")
async def chat_stream(request: Request):
    """Directly returns LangGraph's streaming generator."""
    data = await request.json()
    user_message = data.get("message", "")
    
    return stream_graph_updates(user_message)  # No need for StreamingResponse



@router.post("/joke-stream")
async def joke_stream(request: Request):
    """Streams only the joke content from LangGraph to the client."""
    data = await request.json()
    topic = data.get("topic", "")

    async def joke_generator():
        try:
            # Convert sync generator to async
            for message_chunk, metadata in stream_joke_agent(topic):  
                if message_chunk.content:
                    print(f"Sending chunk: {message_chunk.content}")  
                    yield message_chunk.content + " "  
                    await asyncio.sleep(0)  # Prevents blocking
        except Exception as e:
            print(f"Streaming error: {e}")
            yield f"ERROR: {str(e)}\n"

    return StreamingResponse(joke_generator(), media_type="text/plain")




@router.post("/database_service")
async def db_check(request: Request):
    data = await request.json()
    user_msg = data.get("message", "")
    print(f"user_msg:{user_msg}")
    app = create_workflow()

    # Initialize Langfuse CallbackHandler for Langchain (tracing)
    langfuse_handler = CallbackHandler(session_id=100)
    
    # result = app.invoke({"messages": [("user", "Which sales agent made the most in sales in 2009?")]})
    result = app.invoke(
        # {"messages": [("user", "Which sales agent made the most in sales in 2009?")]}
        # {"messages": [HumanMessage(content = "Which sales agent made the most in sales to customers in 2009, also share the sales number and detaails as well?")]},
        {"messages": [HumanMessage(content = user_msg)]},
        config={"callbacks": [langfuse_handler]},
    )
    answer = result["messages"][-1].tool_calls[0]["args"]["final_answer"]
    # for s in app.stream({"messages": [HumanMessage(content = "Which sales agent made the most in sales to customers in 2009, also share the sales number and detaails as well?")]},
    #                   config={"callbacks": [langfuse_handler]}):
    #     print(s)
    # Return response as JSON (ensuring frontend handles Markdown)
    return JSONResponse(content={"response": answer}, status_code=200)
    # return answer
