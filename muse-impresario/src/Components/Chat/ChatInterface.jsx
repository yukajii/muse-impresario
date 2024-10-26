// src/components/chat/ChatInterface.jsx
import React, { useState } from 'react';
import ChatMessage from './ChatMessage';

const ChatInterface = ({ messages = [], onSendMessage, isProcessing }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isProcessing && (
          <div className="text-center text-gray-500 my-2">
            Processing...
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share your inspiration..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={isProcessing}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-purple-300"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;