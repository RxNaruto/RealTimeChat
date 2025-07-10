import React from 'react';
import { User } from 'lucide-react';
import { ConnectionIndicator } from './ConnectionIndicator';

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

interface ChatHeaderProps {
  peerName: string;
  roomId: number;
  connectionStatus: ConnectionStatus;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  peerName,
  roomId,
  connectionStatus
}) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">Chatting with {peerName}</h2>
            <p className="text-sm text-gray-600">Room #{roomId}</p>
          </div>
        </div>
        <ConnectionIndicator status={connectionStatus} />
      </div>
    </div>
  );
};