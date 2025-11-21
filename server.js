const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files with CORS headers for embedding
app.use(express.static('dist', {
  setHeaders: (res, path) => {
    // Allow embedding from any domain
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Special headers for JavaScript files to allow cross-origin loading
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    }
  }
}));

// Serve the public directory (for chatbot-widget.js)
app.use(express.static('public', {
  setHeaders: (res, path) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    }
  }
}));

// API route - inline OpenAI integration
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    // Import OpenAI dynamically
    const { default: OpenAI } = await import('openai');
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Portfolio context
    const PORTFOLIO_CONTEXT = `
You are a helpful assistant representing a developer's portfolio. Here's information about the developer:

BACKGROUND:
- Full-stack developer with experience in modern web technologies
- Passionate about creating user-friendly applications and solving complex problems
- Strong background in JavaScript, React, Node.js, and cloud technologies

PROJECTS:
- Portfolio Chatbot: An AI-powered chatbot that answers questions about the developer's work
- E-commerce Platform: Built with React, Node.js, and PostgreSQL
- Task Management App: Real-time collaboration tool using WebSockets
- Weather Dashboard: API integration project with data visualization

SKILLS:
- Frontend: React, Vue.js, HTML5, CSS3, JavaScript/TypeScript
- Backend: Node.js, Express, Python, RESTful APIs
- Databases: PostgreSQL, MongoDB, Redis
- Cloud: AWS, Vercel, Docker
- Tools: Git, Webpack, Jest, CI/CD

EXPERIENCE:
- 3+ years of professional development experience
- Experience with agile methodologies and team collaboration
- Strong problem-solving skills and attention to detail

Please answer questions about this developer's background, projects, and skills in a friendly and informative way. If asked about something not covered in this context, politely mention that you'd be happy to connect them directly with the developer for more specific information.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: PORTFOLIO_CONTEXT },
        { role: "user", content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;
    res.status(200).json({ response });

  } catch (error) {
    console.error('OpenAI API error:', error);

    if (error.code === 'insufficient_quota') {
      return res.status(429).json({ error: 'API quota exceeded. Please try again later.' });
    }

    if (error.code === 'invalid_api_key') {
      return res.status(401).json({ error: 'Invalid API key configuration.' });
    }

    res.status(500).json({ error: 'Failed to process your request. Please try again.' });
  }
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
