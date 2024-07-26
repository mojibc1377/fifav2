"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import io, { Socket } from "socket.io-client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FaArrowDown } from "react-icons/fa6";
import { TbPlugConnected } from "react-icons/tb";


type ChatProps = {
  challengerId: number;
  accepterId: number;
  challengeId: number; // Include challengeId as a prop
};

type Message = {
  text: string;
  senderId: number;
  timestamp: string;
};

const Chat: React.FC<ChatProps> = ({ challengerId, accepterId, challengeId }) => {
  const { data: session } = useSession();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const roomId = `${challengerId}-${accepterId}`;
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!session) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/challenges/${challengeId}/messages`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          throw new Error('Invalid JSON response');
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();

    const socket = io("http://localhost:3000");
    socketRef.current = socket;

    socket.emit("joinRoom", roomId);

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("message", (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message");
      socket.close();
    };
  }, [roomId, session, challengeId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent | React.KeyboardEvent) => {
    if (e.preventDefault) e.preventDefault();
    if (message.trim() !== '' && session) {
      const newMessage = { 
        text: message, 
        senderId: Number(session.user.id),
        timestamp: new Date().toLocaleTimeString() // Add current time as the timestamp
      };
      if (socketRef.current) {
        socketRef.current.emit("msg", newMessage, roomId, challengeId); // Include challengeId when sending message
      }
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage(e);
    }
  };

  if (!session) {
    return <div className=""><TbPlugConnected className="text-red-500 text-2xl mr-10 mt-10 animate-bounce ml-2"/></div>;
  }

  return (
    <div className="grid w-full h-5/6">
      <div className="flex flex-col">
        
        <main className="grid gap-4 overflow-hidden p-4 lg:grid-cols-2">
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-background/50 p-3 lg:col-span-2">
            <Badge variant="outline" className="w-fit self-center text-center bg-secondary-foreground/40 text-background top-3">
              Chat {isConnected ? <TbPlugConnected className="text-green-500  ml-2"/> : <TbPlugConnected className="text-red-500  ml-2"/>}
            </Badge>
            <div className="flex flex-col flex-1 mt-6 space-y-2 px-3 overflow-y-auto max-h-[60vh] scrollbar-hide">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 max-w-xs rounded-lg text-white break-words whitespace-pre-wrap ${
                    msg.senderId === Number(session.user.id) ? 'bg-blue-600 self-end' : 'bg-gray-700 self-start'
                  }`}
                >
                  <p className="block">{msg.text}</p>
                  <div className={`text-xs text-gray-300 ${msg.senderId === Number(session.user.id) ? 'text-right' : 'text-left'} animate-pulse`}>{msg.timestamp.slice(11, 16)}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="relative overflow-hidden mt-2 rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
              <Label htmlFor="message" className="sr-only">Message</Label>
              <div className="flex flex-row">
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="start typing "
                  className="min-h-5 resize-none border-0 placeholder:text-italic placeholder:pt-2 placeholder:font-light p-3 focus-within:placeholder:invisible shadow-none bg-background focus-visible:ring-0"
                />
                <div className="flex items-center p-3 pt-2">
                  <Button type="submit" size="sm" className="ml-auto bg-transparent">
                    <FaArrowDown size={15} className="rotate-180 text-secondary" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chat;
