import { useState, useRef, useCallback } from 'react';

interface Message {
  from: string;
  data: string;
  timestamp: number;
}

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';
type AppState = 'join' | 'queue' | 'chat';

interface UseWebSocketReturn {
  ws: WebSocket | null;
  connectionStatus: ConnectionStatus;
  appState: AppState;
  roomId: number | null;
  peerName: string;
  messages: Message[];
  peerTyping: boolean;
  connectWebSocket: () => void;
  joinQueue: (userName: string) => void;
  sendMessage: (roomId: number, userName: string, message: string) => void;
  sendTyping: (roomId: number, userName: string) => void;
  setAppState: (state: AppState) => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setPeerName: React.Dispatch<React.SetStateAction<string>>;
  setRoomId: React.Dispatch<React.SetStateAction<number | null>>;
}

export const useWebSocket = (): UseWebSocketReturn => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [appState, setAppState] = useState<AppState>('join');
  const [roomId, setRoomId] = useState<number | null>(null);
  const [peerName, setPeerName] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [peerTyping, setPeerTyping] = useState(false);
  const peerTypingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const connectWebSocket = useCallback(() => {
    setConnectionStatus('connecting');
    // wss://chatapp.rithkchaudharytechnologies.xyz/ws/
    const socket = new WebSocket("wss://realtimechat.rithkchaudharytechnologies.xyz/ws/");
    
    socket.onopen = () => {
      setConnectionStatus('connected');
      setWs(socket);
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      if (message.type === 'ROOM_JOINED') {
        setRoomId(message.roomId);
        setPeerName(message.peer);
        setAppState('chat');
      } else if (message.type === 'MESSAGE') {
        setMessages(prev => [...prev, {
          from: message.from,
          data: message.data,
          timestamp: Date.now()
        }]);
      } else if (message.type === 'USER_TYPING') {
        setPeerTyping(true);
        if (peerTypingTimeoutRef.current) {
          clearTimeout(peerTypingTimeoutRef.current);
        }
        peerTypingTimeoutRef.current = setTimeout(() => setPeerTyping(false), 3000);
      } else if (message.type === 'Partner disconnected') {
        setAppState('join');
        setRoomId(null);
        setPeerName('');
        setMessages([]);
        alert('Your chat partner has disconnected. You can join the queue again.');
      }
    };

    socket.onclose = () => {
      setConnectionStatus('disconnected');
      setWs(null);
    };

    socket.onerror = () => {
      setConnectionStatus('disconnected');
      setWs(null);
    };
  }, []);

  const joinQueue = useCallback((userName: string) => {
    if (!userName.trim()) return;
    
    if (connectionStatus !== 'connected') {
      connectWebSocket();
    }
    
    if (ws && connectionStatus === 'connected') {
      ws.send(JSON.stringify({
        type: 'JOIN',
        name: userName.trim()
      }));
      setAppState('queue');
    }
  }, [ws, connectionStatus, connectWebSocket]);

  const sendMessage = useCallback((roomId: number, userName: string, message: string) => {
    if (!message.trim() || !ws || roomId === null) return;

    ws.send(JSON.stringify({
      type: 'MESSAGE',
      roomId: roomId,
      name: userName,
      data: message.trim()
    }));

    setMessages(prev => [...prev, {
      from: userName,
      data: message.trim(),
      timestamp: Date.now()
    }]);
  }, [ws]);

  const sendTyping = useCallback((roomId: number, userName: string) => {
    if (ws && roomId !== null) {
      ws.send(JSON.stringify({
        type: 'TYPING',
        roomId: roomId,
        name: userName
      }));
    }
  }, [ws]);

  return {
    ws,
    connectionStatus,
    appState,
    roomId,
    peerName,
    messages,
    peerTyping,
    connectWebSocket,
    joinQueue,
    sendMessage,
    sendTyping,
    setAppState,
    setMessages,
    setPeerName,
    setRoomId
  };
};