import React, { useState } from 'react';
import { Send, Smile } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

interface MessageInputProps {
  currentMessage: string;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  currentMessage,
  onMessageChange,
  onSendMessage,
  onKeyPress
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiClick = (emojiData: any) => {
    onMessageChange(currentMessage + emojiData.emoji);
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end space-x-3">
          <div className="flex flex-col flex-1 relative">
            <textarea
              value={currentMessage}
              onChange={(e) => onMessageChange(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="Type your message..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all"
              rows={1}
              maxLength={500}
            />

            <button
              onClick={() => setShowPicker((prev) => !prev)}
              className="absolute bottom-2 right-2 p-1 rounded-md hover:bg-gray-100 transition"
              type="button"
            >
              <Smile className="w-5 h-5 text-gray-500" />
            </button>

            {showPicker && (
              <div className="absolute bottom-12 left-0 z-50">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          <button
            onClick={onSendMessage}
            disabled={!currentMessage.trim()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
