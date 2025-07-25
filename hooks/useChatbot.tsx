import { useState } from "react";

export default function useChatbot() {
  const [messages, setMessages] = useState<string[]>([]);

  const send = (text: string) => {
    const user = `You: ${text}`;
    const bot = `Bot: Thanks for sharing. You said: ${text}`;
    setMessages(prev => [...prev, user, bot]);
  };

  return {
    messages,
    send,
  };
}