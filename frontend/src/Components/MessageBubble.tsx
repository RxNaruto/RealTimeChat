import React from 'react';

interface Message {
  from: string;
  data: string;
  timestamp: number;
}

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwnMessage
}) => {
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
          isOwnMessage
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
            : 'bg-white text-gray-800 shadow-sm border border-gray-200'
        }`}
      >
        <div className="text-sm font-medium mb-1 opacity-75">
          {isOwnMessage ? 'You' : message.from}
        </div>
        <div className="break-words">{message.data}</div>
        <div className="text-xs opacity-50 mt-1">
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
};