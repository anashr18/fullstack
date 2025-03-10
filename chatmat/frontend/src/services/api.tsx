export async function streamChatResponse(userMessage: string, onChunk: (text: string) => void) {
  const response = await fetch("http://127.0.0.1:8000/api/chat-stream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage }),
  });

  if (!response.body) return;

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let botMessage = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    botMessage += decoder.decode(value, { stream: true });
    onChunk(botMessage);
  }
}

export async function streamJokeResponse(topic: string, onChunk: (text: string) => void) {
  const response = await fetch("http://127.0.0.1:8000/api/joke-stream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });

  if (!response.body) return;

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    // Decode only the new chunk
    const chunkText = decoder.decode(value, { stream: true });

    // Pass only the new chunk to `onChunk` instead of accumulating
    onChunk(chunkText);
  }
}
// export async function streamDatabaseServiceResponse(message: string, onChunk: (text: string) => void) {
//   const response = await fetch("http://127.0.0.1:8080/api/database_service", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ message }),
//   });

//   if (!response.body) return;

//   const reader = response.body.getReader();
//   const decoder = new TextDecoder();

//   while (true) {
//     const { done, value } = await reader.read();
//     if (done) break;

//     console.log(value)
//     // Decode only the new chunk
//     const chunkText = decoder.decode(value, { stream: true });
//     console.log(chunkText)
//     // Pass only the new chunk to `onChunk`
//     onChunk(chunkText);
//   }
// }

export async function streamDatabaseServiceResponse(
  message: string,
  onChunk: (text: string) => void
) {
  const response = await fetch("http://127.0.0.1:8080/api/database_service", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!response.body) return;

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let accumulatedText = ""; // Buffer to store accumulated text

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    // Decode only the new chunk
    const chunkText = decoder.decode(value, { stream: true });
    accumulatedText += chunkText; // Append chunk to buffer

    try {
      // Try parsing the complete response as JSON
      const jsonResponse = JSON.parse(accumulatedText);
      onChunk(jsonResponse.response); // Extract the 'response' field
      break; // Exit loop once response is parsed
    } catch (error) {
      // If parsing fails, continue reading more chunks
      continue;
    }
  }
}

