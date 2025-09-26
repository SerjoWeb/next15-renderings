"use client";

import { type ReactElement, memo, useEffect, useState } from "react";
import Button from "@/components/ui/form/button/Button";

const WebsocketPage = (): ReactElement => {
  const [messages, setMessages] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send("Hello from Next.js client!");
    }
  };

  useEffect(() => {
    const newWs = new WebSocket("wss://echo.websocket.org");

    newWs.onopen = () => {
      console.log("WebSocket connection established");
    };

    newWs.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    newWs.onclose = () => {
      console.log("WebSocket connection closed");
    };

    newWs.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setWs(newWs);

    return () => {
      if (newWs.readyState === WebSocket.OPEN) {
        newWs.close();
      }
    };
  }, []);

  return (
    <div className="p-5">
      <h3 className="font-semibold">Websocket example (CSR Render)</h3>
      <div className="mt-6">
        <Button onClick={sendMessage}>Send Message</Button>
        <div className="mt-4">
          <h2>Received Messages:</h2>
          <ul className="mt-2">
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(WebsocketPage);
