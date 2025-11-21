// Simple local development server for testing the chatbot
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import API handlers
const chatHandler = require('./api/chat.js');
const embedHandler = require('./api/embed.js');
const widgetHandler = require('./api/widget.js');
const embedCodeHandler = require('./api/embed-code.js');

// Create mock request/response for serverless functions
function createMockHandler(handler) {
  return async (req, res) => {
    try {
      // Create serverless-compatible request object
      const mockReq = {
        method: req.method,
        body: req.body,
        query: req.query,
        headers: req.headers
      };

      // Create serverless-compatible response object
      const mockRes = {
        setHeader: (key, value) => res.setHeader(key, value),
        status: (code) => ({
          json: (data) => res.status(code).json(data),
          send: (data) => res.status(code).send(data),
          end: () => res.status(code).end()
        }),
        json: (data) => res.json(data),
        send: (data) => res.send(data),
        end: () => res.end()
      };

      await handler.default(mockReq, mockRes);
    } catch (error) {
      console.error('Handler error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

// API routes
app.use('/api/chat', createMockHandler(chatHandler));
app.use('/api/embed', createMockHandler(embedHandler));
app.use('/api/widget', createMockHandler(widgetHandler));
app.use('/api/embed-code', createMockHandler(embedCodeHandler));

// Rewrite /embed.html to /api/embed
app.get('/embed.html', createMockHandler(embedHandler));

// Serve static files (if any)
app.use(express.static('public'));

// Default route
app.get('/', (req, res) => {
  res.send(`
    <h1>🤖 Portfolio Chatbot - Local Development</h1>
    <p>Your chatbot API is running locally!</p>
    <h2>Available endpoints:</h2>
    <ul>
      <li><a href="/embed.html" target="_blank">📱 Embed Preview</a> - Full chat interface</li>
      <li><a href="/api/embed-code" target="_blank">📋 Embed Code</a> - Copy-paste widget code</li>
      <li><a href="/api/widget" target="_blank">🔧 Widget Script</a> - JavaScript widget</li>
      <li>📡 <code>POST /api/chat</code> - Chat API endpoint</li>
    </ul>
    <h2>Test the embed:</h2>
    <iframe src="/embed.html" width="400" height="600" frameborder="0" style="border: 1px solid #ccc; border-radius: 8px;"></iframe>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 Local development server running!`);
  console.log(`📱 Embed preview: http://localhost:${PORT}/embed.html`);
  console.log(`🏠 Dashboard: http://localhost:${PORT}`);
  console.log(`📋 Embed code: http://localhost:${PORT}/api/embed-code`);
  console.log(`🔧 Widget script: http://localhost:${PORT}/api/widget`);
});

module.exports = app;
