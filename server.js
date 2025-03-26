const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// ✅ Health check endpoint
app.get('/api/test', (req, res) => {
  res.json({
    status: 'API is working!',
    timestamp: new Date().toISOString()
  });
});

// ✅ Summarize endpoint
app.post('/api/summarize', async (req, res) => {
  const content = req.body.content;

  if (!content) {
    return res.status(400).json({ error: 'Content is required.' });
  }

  // Dummy response (later you can call OpenAI here)
  const summary = `This is a summary of: ${content}`;
  res.json({ summary });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

