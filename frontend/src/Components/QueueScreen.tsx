import React from 'react';
import { Users } from 'lucide-react';
import { ConnectionIndicator } from './ConnectionIndicator';

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

interface QueueScreenProps {
  connectionStatus: ConnectionStatus;
}

export const QueueScreen: React.FC<QueueScreenProps> = ({ connectionStatus }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 animate-pulse">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Finding a Chat Partner</h2>
          <p className="text-gray-600">Please wait while we connect you with someone...</p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <ConnectionIndicator status={connectionStatus} />
        </div>
      </div>
    </div>
  );
};