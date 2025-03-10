'use client'
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { streamJokeResponse, streamDatabaseServiceResponse } from "@/services/api";
import ReactMarkdown from "react-markdown";

const agents = {
  DB_Chat: streamDatabaseServiceResponse,
  JustChat: streamJokeResponse,
};

export default function ChatApp() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("DB_Chat");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    let botMessage = { role: "assistant", content: "" };
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    const streamFunction = agents[selectedAgent];

    if (streamFunction) {
      await streamFunction(input, (chunk) => {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1] = {
            role: "assistant",
            content: prevMessages[updatedMessages.length - 1].content + chunk,
          };
          return updatedMessages;
        });
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-2xl p-4 space-y-4">
        <div className="flex space-x-2 mb-4">
          {Object.keys(agents).map((agent) => (
            <Button key={agent} onClick={() => setSelectedAgent(agent)} variant={selectedAgent === agent ? "default" : "outline"}>
              {agent.charAt(0).toUpperCase() + agent.slice(1)}
            </Button>
          ))}
        </div>
        <CardContent>
          <div className="space-y-2 h-96 overflow-y-auto border p-2 rounded">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 rounded ${msg.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"}`}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            ))}
          </div>
        </CardContent>
        <div className="flex space-x-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyPress} placeholder="Type your message..." />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </Card>
    </div>
  );
}
