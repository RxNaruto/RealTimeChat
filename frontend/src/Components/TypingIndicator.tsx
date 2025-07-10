import React from 'react';

interface TypingIndicatorProps {
  peerName: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ peerName }) => {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-100 px-4 py-2 rounded-2xl">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
          </div>
          <span className="text-sm text-gray-600">{peerName} is typing...</span>
        </div>
      </div>
    </div>
  );
};