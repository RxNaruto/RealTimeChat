import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

interface ConnectionIndicatorProps {
  status: ConnectionStatus;
}

export const ConnectionIndicator: React.FC<ConnectionIndicatorProps> = ({ status }) => (
  <div className="flex items-center space-x-2">
    {status === 'connected' ? (
      <Wifi className="w-4 h-4 text-green-500" />
    ) : (
      <WifiOff className="w-4 h-4 text-red-500" />
    )}
    <span className={`text-sm font-medium ${
      status === 'connected' ? 'text-green-600' : 'text-red-600'
    }`}>
      {status === 'connected' ? 'Connected' : 'Disconnected'}
    </span>
  </div>
);