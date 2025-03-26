require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

// ✅ Use environment variable here
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get('/', (req, res) => {
  res.json({ message: 'Tekari AI Backend is running!' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
