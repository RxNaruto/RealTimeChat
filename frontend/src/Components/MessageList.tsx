import React, { useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

interface Message {
  from: string;
  data: string;
  timestamp: number;
}

interface MessageListProps {
  messages: Message[];
  userName: string;
  peerTyping: boolean;
  peerName: string;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  userName,
  peerTyping,
  peerName
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, peerTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">Start the conversation by sending a message!</p>
        </div>
      ) : (
        messages.map((msg, index) => (
          <MessageBubble
            key={index}
            message={msg}
            isOwnMessage={msg.from === userName}
          />
        ))
      )}
      
      {peerTyping && <TypingIndicator peerName={peerName} />}
      
      <div ref={messagesEndRef} />
    </div>
  );
};