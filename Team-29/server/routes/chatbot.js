const express = require('express');
const axios = require('axios');
const router = express.Router();

// Use Groq API
const GROQ_API_KEY = '';
const GROQ_MODEL = '';

router.post('/', async (req, res) => {
  const { farmerId, weatherData, forecast, userMessage, crop } = req.body;

  // Build a highly specific, crop-focused prompt
  const prompt = `
Farmer ID: ${farmerId}
Location: Assam, India
Crop: ${crop || "unknown"}
Current Weather: ${weatherData}
3-Day Forecast: ${forecast}
Question: ${userMessage || `Give me a summary and actionable advice for the current weather and forecast. ONLY give advice for crop management, crop loss prevention, and disaster recovery. Do NOT give personal health or hydration advice. If there is a severe weather alert, focus on protecting crops and minimizing losses. If you know the crop, tailor the advice to that crop. If not, give general crop management and disaster prevention tips for Assam farmers.`}

Please structure your response with the following sections:
1. Summary: Brief overview of current weather conditions and their impact on crops
2. Actionable Advice: Specific, step-by-step recommendations for crop management
3. Disaster Recovery: Steps to take if crops are damaged by weather
4. General Tips for Assam Farmers: Best practices for the region

Format each section with clear headings and proper spacing.`;

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: 'You are an expert agricultural advisor for Assam, India. Structure your responses with clear sections: Summary, Actionable Advice, Disaster Recovery, and General Tips for Assam Farmers. Use proper spacing and formatting. ONLY give actionable, crop-specific advice for farmers. Never give personal health or hydration advice.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 600,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    const reply = response.data.choices?.[0]?.message?.content || 'Sorry, I could not get a response.';
    res.json({ reply });
  } catch (err) {
    console.error('Chatbot error:', err?.response?.data || err.message);
    res.status(500).json({ reply: 'Sorry, I could not get a response.' });
  }
});

module.exports = router; 