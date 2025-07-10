import React from 'react';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

interface Message {
  from: string;
  data: string;
  timestamp: number;
}

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

interface ChatScreenProps {
  userName: string;
  peerName: string;
  roomId: number;
  messages: Message[];
  currentMessage: string;
  peerTyping: boolean;
  connectionStatus: ConnectionStatus;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  userName,
  peerName,
  roomId,
  messages,
  currentMessage,
  peerTyping,
  connectionStatus,
  onMessageChange,
  onSendMessage,
  onKeyPress
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <ChatHeader
        peerName={peerName}
        roomId={roomId}
        connectionStatus={connectionStatus}
      />

      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          <MessageList
            messages={messages}
            userName={userName}
            peerTyping={peerTyping}
            peerName={peerName}
          />
        </div>
      </div>

      <MessageInput
        currentMessage={currentMessage}
        onMessageChange={onMessageChange}
        onSendMessage={onSendMessage}
        onKeyPress={onKeyPress}
      />
    </div>
  );
};