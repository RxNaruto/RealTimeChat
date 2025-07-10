import React from 'react';
import { MessageCircle } from 'lucide-react';
import { ConnectionIndicator } from './ConnectionIndicator';

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

interface JoinScreenProps {
  userName: string;
  setUserName: (name: string) => void;
  onJoinQueue: () => void;
  connectionStatus: ConnectionStatus;
}

export const JoinScreen: React.FC<JoinScreenProps> = ({
  userName,
  setUserName,
  onJoinQueue,
  connectionStatus
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onJoinQueue();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ChatConnect</h1>
          <p className="text-gray-600">Connect with strangers worldwide</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter your name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Your name..."
              maxLength={20}
            />
          </div>

          <button
            onClick={onJoinQueue}
            disabled={!userName.trim() || connectionStatus === 'connecting'}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            {connectionStatus === 'connecting' ? 'Connecting...' : 'Join Chat'}
          </button>

          <div className="pt-4 border-t border-gray-200">
            <ConnectionIndicator status={connectionStatus} />
          </div>
        </div>
      </div>
    </div>
  );
};