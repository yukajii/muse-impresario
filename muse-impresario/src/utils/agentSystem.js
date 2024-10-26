// src/utils/agentSystem.js
import { createCompletion, createImage } from './openaiService';
import { agents } from '../config/agents';

class AgentSystem {
  constructor(apiKey, onMessage, onStoryUpdate) {
    this.apiKey = apiKey;
    this.onMessage = onMessage;
    this.onStoryUpdate = onStoryUpdate;
    this.story = {
      concept: '',
      characters: [],
      scene: {},
      acts: []
    };
    this.context = [];
  }

  async addMessage(message) {
    this.context.push(message);
    this.onMessage(message);
  }

  updateStory(updates) {
    this.story = { ...this.story, ...updates };
    this.onStoryUpdate(this.story);
  }

  async handleImpresarioResponse(userInput) {
    // Simplified test version
    const prompt = `As the Impresario of a video game narrative development team, 
    respond to this input from the Muse: "${userInput}"
    
    Current story state: ${JSON.stringify(this.story)}
    
    Provide a brief, encouraging response and suggest the next step.`;

    try {
      const response = await createCompletion(prompt, this.apiKey);
      await this.addMessage({
        agent: 'impresario',
        content: response,
        timestamp: new Date().toISOString()
      });

      // For testing, we'll always update the story concept
      if (!this.story.concept) {
        this.updateStory({ concept: userInput });
      }

      return { action: 'await_user', message: 'Awaiting further inspiration from the Muse.' };
    } catch (error) {
      console.error('Error in Impresario response:', error);
      throw error;
    }
  }
}

export default AgentSystem;