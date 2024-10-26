// src/components/chat/ChatMessage.jsx
import React from 'react';
import { agents } from '../../config/agents';

const ChatMessage = ({ message, type = 'message' }) => {
  const agent = agents[message.agent];
  const bgColorClass = `bg-${agent.color}-50`;
  const borderColorClass = `border-${agent.color}-200`;
  const textColorClass = `text-${agent.color}-800`;

  return (
    <div className={`p-4 mb-4 rounded-lg border ${borderColorClass} ${bgColorClass}`}>
      <div className="flex items-center mb-2">
        <span className="text-2xl mr-2">{agent.avatar}</span>
        <div>
          <h3 className={`font-bold ${textColorClass}`}>{agent.name}</h3>
          <p className="text-sm text-gray-500">{agent.role}</p>
        </div>
      </div>
      <div className="ml-10">
        {type === 'message' ? (
          <p className="text-gray-700">{message.content}</p>
        ) : (
          <div className="flex items-center space-x-2">
            <img
              src={message.content}
              alt="Generated content"
              className="max-w-sm rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

// src/components/chat/ChatInterface.jsx
import React, { useState } from 'react';
import ChatMessage from './ChatMessage';

const ChatInterface = ({ messages = [], onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
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
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share your inspiration..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

// src/components/chat/StoryPreview.jsx
import React from 'react';

const StoryPreview = ({ story = {} }) => {
  return (
    <div className="h-full overflow-y-auto p-4">
      {story.concept && (
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-4">Concept</h3>
          <p className="text-gray-700">{story.concept}</p>
        </section>
      )}
      
      {story.characters && (
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-4">Characters</h3>
          {story.characters.map((character, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-bold">{character.name}</h4>
              <p className="text-gray-700">{character.description}</p>
              {character.image && (
                <img
                  src={character.image}
                  alt={character.name}
                  className="mt-2 max-w-xs rounded-lg"
                />
              )}
            </div>
          ))}
        </section>
      )}
      
      {story.scene && (
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-4">Scene</h3>
          <p className="text-gray-700">{story.scene.description}</p>
          {story.scene.image && (
            <img
              src={story.scene.image}
              alt="Scene"
              className="mt-2 max-w-sm rounded-lg"
            />
          )}
        </section>
      )}
      
      {story.acts && (
        <section>
          <h3 className="text-xl font-bold mb-4">Acts</h3>
          {story.acts.map((act, index) => (
            <div key={index} className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-bold mb-2">Act {index + 1}</h4>
              {/* Add act content structure here */}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default StoryPreview;