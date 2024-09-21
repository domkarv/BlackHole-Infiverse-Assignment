import { ArrowUpIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

interface Message {
  id: number;
  text: string;
  sender: "user" | "model";
}

export default function ChatbotPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: input.trim(),
        sender: "user",
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      setInput("");

      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: Date.now(),
          text: "This is a simulated bot response.",
          sender: "model",
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  return (
    <div className='flex flex-col h-screen max-w-5xl mx-auto py-6'>
      <ScrollArea
        className='flex-grow mb-6 p-4 border rounded-lg bg-white shadow-inner'
        ref={scrollAreaRef}
      >
        <div className='space-y-4'>
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "inline-block p-3 rounded-2xl max-w-[80%]",
                  message.sender === "user"
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-800"
                )}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className='flex gap-2'>
        <Input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type your message...'
          className='flex-grow bg-white'
        />
        <Button
          type='submit'
          size='icon'
          disabled={!input.trim()}
          className='bg-primary text-white disabled:bg-gray-300'
        >
          <ArrowUpIcon className='h-4 w-4' />
          <span className='sr-only'>Submit</span>
        </Button>
      </form>
    </div>
  );
}
