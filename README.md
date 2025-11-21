# Portfolio Chatbot

An AI-powered chatbot that answers questions about your portfolio, built with React and OpenAI's API.

## Features

- 🤖 AI-powered responses using OpenAI's GPT models
- 💬 Real-time chat interface
- 📱 Responsive design for mobile and desktop
- ⚡ Serverless API endpoint
- 🎨 Modern, beautiful UI

## Project Structure

```
portfolio-chatbot/
├── frontend/
│   ├── App.jsx          # Main chat application component
│   ├── ChatMessage.jsx  # Individual message component
│   ├── App.css          # Main application styles
│   └── ChatMessage.css  # Message component styles
├── api/
│   └── chat.js          # Serverless endpoint for OpenAI integration
├── package.json         # Project dependencies and scripts
├── env.example          # Environment variables template
└── README.md           # This file
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd portfolio-chatbot
npm install
```

### 2. Configure Environment Variables

1. Copy the environment template:
   ```bash
   cp env.example .env
   ```

2. Add your OpenAI API key to `.env`:
   ```
   OPENAI_API_KEY=your_actual_api_key_here
   ```

3. Get your OpenAI API key from: https://platform.openai.com/api-keys

### 3. Customize Portfolio Information

Edit the `PORTFOLIO_CONTEXT` in `api/chat.js` to include your actual:
- Background and experience
- Projects and achievements
- Skills and technologies
- Any other relevant information

### 4. Run the Application

For development:
```bash
npm run dev
```

For production build:
```bash
npm run build
npm run preview
```

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `OPENAI_API_KEY` in Vercel's environment variables
4. Deploy!

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure the serverless function in `netlify.toml`
4. Add environment variables in Netlify settings

### Other Platforms
The serverless function (`api/chat.js`) is compatible with most serverless platforms. Adjust the export format as needed for your chosen platform.

## Customization

### Styling
- Modify `frontend/App.css` for overall application styling
- Modify `frontend/ChatMessage.css` for message-specific styling
- Colors, fonts, and layout can be easily customized

### AI Behavior
- Edit the `PORTFOLIO_CONTEXT` in `api/chat.js`
- Adjust `temperature`, `max_tokens`, and other OpenAI parameters
- Switch between different GPT models (gpt-3.5-turbo, gpt-4, etc.)

### Features
- Add message history persistence
- Implement typing indicators
- Add file upload capabilities
- Include voice input/output

## API Usage

The chat endpoint accepts POST requests:

```javascript
fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Your question here' })
})
```

Response format:
```json
{
  "response": "AI-generated response text"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own portfolio!

## Support

If you encounter any issues or have questions, please open an issue on GitHub or contact me directly.
