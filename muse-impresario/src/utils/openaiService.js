// src/utils/openaiService.js
const createCompletion = async (prompt, apiKey) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || 'OpenAI API call failed');
      }
  
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      throw error;
    }
  };
  
  const createImage = async (prompt, apiKey) => {
    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt,
          n: 1,
          size: '1024x1024',
        }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || 'DALL-E API call failed');
      }
  
      return data.data[0].url;
    } catch (error) {
      console.error('Error calling DALL-E:', error);
      throw error;
    }
  };
  
  export { createCompletion, createImage };