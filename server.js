const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// Import the chat handler
const chatHandler = require('./api/chat.js');

// API route
app.post('/api/chat', async (req, res) => {
  try {
    // Create a mock request/response object for the serverless function
    const mockReq = {
      method: 'POST',
      body: req.body
    };
    
    const mockRes = {
      setHeader: (key, value) => res.setHeader(key, value),
      status: (code) => ({
        json: (data) => res.status(code).json(data),
        end: () => res.status(code).end()
      })
    };

    await chatHandler.default(mockReq, mockRes);
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
