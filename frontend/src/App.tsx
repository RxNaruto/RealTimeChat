import React, { useState, useRef } from 'react';
import { JoinScreen } from './Components/JoinScreen';
import { QueueScreen } from './Components/QueueScreen';
import { ChatScreen } from './Components/ChatScreen';
import { useWebSocket } from './hooks/useWebSocket';

function App() {
  const [userName, setUserName] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    connectionStatus,
    appState,
    roomId,
    peerName,
    messages,
    peerTyping,
    joinQueue,
    sendMessage,
    sendTyping
  } = useWebSocket();

  const handleJoinQueue = () => {
    joinQueue(userName);
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim() || roomId === null) return;

    sendMessage(roomId, userName, currentMessage);
    setCurrentMessage('');
    setIsTyping(false);
  };

  const handleMessageChange = (value: string) => {
    setCurrentMessage(value);
    
    if (!isTyping && value.trim() && roomId !== null) {
      setIsTyping(true);
      sendTyping(roomId, userName);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  if (appState === 'join') {
    return (
      <JoinScreen
        userName={userName}
        setUserName={setUserName}
        onJoinQueue={handleJoinQueue}
        connectionStatus={connectionStatus}
      />
    );
  }

  if (appState === 'queue') {
    return <QueueScreen connectionStatus={connectionStatus} />;
  }

  return (
    <ChatScreen
      userName={userName}
      peerName={peerName}
      roomId={roomId!}
      messages={messages}
      currentMessage={currentMessage}
      peerTyping={peerTyping}
      connectionStatus={connectionStatus}
      onMessageChange={handleMessageChange}
      onSendMessage={handleSendMessage}
      onKeyPress={handleKeyPress}
    />
  );
}

export default App;