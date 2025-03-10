from typing import TypedDict
from langgraph.graph import StateGraph, START
from langchain_openai import ChatOpenAI
# Define the state of the graph
class State(TypedDict):
    topic: str
    joke: str
llm = ChatOpenAI(model="gpt-4o")
# Step 1: Modify the topic slightly
def refine_topic(state: State):
    return {"topic": state["topic"] + " and cats"}

# Step 2: Generate a joke based on the refined topic
def generate_joke(state: State):
    llm_response = llm.invoke(
        [
            {"role": "user", "content": f"Generate a joke about {state['topic']}"}
        ]
    )
    return {"joke": llm_response.content}


graph = (
    StateGraph(State)
    .add_node(refine_topic)
    .add_node(generate_joke)
    .add_edge(START, "refine_topic")
    .add_edge("refine_topic", "generate_joke")
    .compile()
)

# Sync Streaming response from LangGraph
def stream_joke_agent(topic: str):
    """Returns LangGraph's built-in streaming generator."""
    return graph.stream({"topic": topic}, stream_mode="messages")
# Async Streaming 
# async def stream_joke_agent(topic: str):
#     """Returns LangGraph's built-in asynchronous streaming generator."""
#     async for message_chunk, metadata in graph.astream({"topic": topic}, stream_mode="messages"):
#         yield message_chunk, metadata  # Yield chunks asynchronously
