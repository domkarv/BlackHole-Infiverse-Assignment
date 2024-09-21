import { ArrowUpIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { getChatResponce } from "../actions/chat.actions";
import { cn } from "../lib/utils";
import { Message } from "../types/message";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const inputMsg = input.trim();

    if (inputMsg) {
      const newMessage: Message = {
        id: Date.now(),
        parts: [{ text: inputMsg }],
        role: "user",
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      const chatResponce = await getChatResponce({
        prompt: inputMsg,
        history: messages.map((message) => ({
          role: message.role,
          parts: message.parts,
        })),
      });

      setInput("");

      const botResponse: Message = {
        id: Date.now(),
        parts: [{ text: chatResponce }],
        role: "model",
      };

      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }
  };

  return (
    <div className='flex flex-col h-screen max-w-5xl mx-auto py-4'>
      <div
        className='flex-grow overflow-y-auto p-6 space-y-4'
        ref={scrollAreaRef}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "inline-block p-3 rounded-2xl max-w-[80%]",
                message.role === "user"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              )}
            >
              <Markdown>{message.parts[0].text}</Markdown>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className='flex gap-2 p-2'>
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
