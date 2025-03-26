// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Health check route
app.get('/api/test', (req, res) => {
  res.json({
    status: 'API is working!',
    timestamp: new Date().toISOString()
  });
});

// Main summarize route
app.post('/api/summarize', (req, res) => {
  const content = req.body.content;
  if (!content) {
    return res.status(400).json({ error: 'Content is required.' });
  }

  // Mock summary logic for now
  const summary = `This is a summary of: ${content}`;
  res.json({ summary });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
