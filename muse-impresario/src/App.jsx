// src/App.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const App = () => {
  const [apiKey, setApiKey] = useState(() => {
    // Try to get API key from sessionStorage
    return sessionStorage.getItem('openai_api_key') || '';
  });
  const [isKeyValid, setIsKeyValid] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const validateApiKey = async (key) => {
    setIsChecking(true);
    try {
      // Simple validation - we'll just check if it starts with 'sk-'
      // In production, you might want to make a test API call
      if (key.startsWith('sk-') && key.length > 20) {
        sessionStorage.setItem('openai_api_key', key);
        setIsKeyValid(true);
        return true;
      }
      setIsKeyValid(false);
      return false;
    } catch (error) {
      setIsKeyValid(false);
      return false;
    } finally {
      setIsChecking(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await validateApiKey(apiKey);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {!isKeyValid ? (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Welcome to Muse-Impresario</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label 
                  htmlFor="apiKey" 
                  className="block text-sm font-medium text-gray-700"
                >
                  OpenAI API Key
                </label>
                <input
                  type="password"
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="sk-..."
                  required
                />
                <p className="mt-2 text-sm text-gray-500">
                  Your API key will be stored securely in your browser's session storage.
                </p>
              </div>
              <button
                type="submit"
                disabled={isChecking}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
              >
                {isChecking ? 'Validating...' : 'Start Creating'}
              </button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <MainInterface />
      )}
    </div>
  );
};

// In your App.jsx, replace the MainInterface component with:

import AgentSystem from '../utils/agentSystem';

const MainInterface = () => {
  const [messages, setMessages] = useState([]);
  const [story, setStory] = useState({});
  const [agentSystem, setAgentSystem] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const apiKey = sessionStorage.getItem('openai_api_key');
    if (apiKey) {
      const system = new AgentSystem(
        apiKey,
        (message) => setMessages(prev => [...prev, message]),
        (storyUpdate) => setStory(storyUpdate)
      );
      setAgentSystem(system);
    }
  }, []);

  const handleSendMessage = async (content) => {
    if (!agentSystem || isProcessing) return;

    setIsProcessing(true);
    try {
      // Add user message
      const userMessage = {
        agent: 'muse',
        content,
        timestamp: new Date().toISOString()
      };
      await agentSystem.addMessage(userMessage);

      // Get Impresario's response
      await agentSystem.handleImpresarioResponse(content);
    } catch (error) {
      console.error('Error processing message:', error);
      // Add error handling UI here
    } finally {
      setIsProcessing(false);
    }
  };

  // Rest of the component remains the same
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header className="bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900">Muse-Impresario</h1>
        <p className="mt-2 text-gray-600">Your AI-powered narrative development suite</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow rounded-lg h-[700px] flex flex-col">
          <h2 className="text-xl font-semibold p-4 border-b">Production Room</h2>
          <ChatInterface 
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        </div>
        
        <div className="bg-white shadow rounded-lg h-[700px] flex flex-col">
          <h2 className="text-xl font-semibold p-4 border-b">Story Preview</h2>
          <StoryPreview story={story} />
        </div>
      </div>
    </div>
  );
};

export default App;