const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    status: 'API is working!',
    timestamp: new Date().toISOString()
  });
});

// Main AI Copilot endpoint
app.post('/api/summarize', async (req, res) => {
  const content = req.body.content;

  if (!content) {
    return res.status(400).json({ error: 'Content is required.' });
  }

  try {
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are Tekari Copilot, a helpful AI assistant. Answer user questions clearly, summarize if needed, tell jokes, and provide professional yet friendly responses."
        },
        {
          role: "user",
          content
        }
      ],
      temperature: 0.7
    });

    const summary = chatResponse.choices[0].message.content;
    res.json({ summary });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to generate summary." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});



