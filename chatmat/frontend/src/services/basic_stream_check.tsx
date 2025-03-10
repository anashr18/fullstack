export async function streamChatResponse(userMessage: string, onChunk: (text: string) => void) {
  const response = await fetch("http://localhost:8000/api/basic_stream_check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage }),
  });

  if (!response.body) {
    console.error("Response body is empty");
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let botMessage = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    botMessage += decoder.decode(value, { stream: true });

    // Ensure real-time UI update
    onChunk(botMessage);
  }
}
