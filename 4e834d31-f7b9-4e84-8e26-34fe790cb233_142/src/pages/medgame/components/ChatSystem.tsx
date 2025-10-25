
import { useState } from 'react';

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
  avatar: string;
}

interface ChatSystemProps {
  messages: Message[];
  onSendMessage: (message: Message) => void;
}

export default function ChatSystem({ messages, onSendMessage }: ChatSystemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        user: 'You',
        text: newMessage,
        timestamp: new Date(),
        avatar: 'user'
      };
      onSendMessage(message);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-50"
      >
        <i className={`${isOpen ? 'ri-close-line' : 'ri-chat-3-line'} text-xl`}></i>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50">
          {/* Chat Header */}
          <div className="bg-teal-600 text-white p-4 rounded-t-lg">
            <h3 className="font-semibold">Global Chat</h3>
            <p className="text-sm text-teal-100">Connect with other players</p>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 text-sm">
                <i className="ri-chat-3-line text-2xl mb-2"></i>
                <p>No messages yet. Start a conversation!</p>
              </div>
            ) : (
              messages.map(message => (
                <div key={message.id} className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {message.user.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-2">
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {message.user} • {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 text-white px-3 py-2 rounded-lg transition-colors"
              >
                <i className="ri-send-plane-line"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
