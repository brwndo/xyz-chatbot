# Portfolio Chatbot

An embeddable AI-powered chatbot that answers questions about your portfolio, built with serverless functions and OpenAI's API.

## Features

- 🤖 AI-powered responses using OpenAI's GPT models
- 💬 Real-time chat interface (with AI chat icon)
- 📱 Responsive design for mobile and desktop
- ⚡ Serverless API endpoints (Vercel)
- 🎨 Modern, beautiful UI
- 🔧 Easy embedding with a single script tag

## Project Structure

```
xyz-chatbot/
├── api/
│   ├── chat.js          # Chat API endpoint (OpenAI integration)
│   ├── embed.js         # Embed HTML page (chat interface)
│   ├── widget.js        # Widget script endpoint (floating button)
│   └── index.js         # Landing page dashboard
├── public/
│   └── images/
│       └── chat-ai-fill.svg  # Chat icon
├── local-dev.js         # Local development server
├── vercel.json          # Vercel configuration
├── package.json         # Project dependencies
├── env.example          # Environment variables template
└── README.md           # This file
```

## Setup Instructions

### 1. Install Dependencies

```bash
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

Edit the `PORTFOLIO_CONTEXT` and `DETAILED_KNOWLEDGE` in `api/chat.js` to include your actual:
- Background and experience
- Projects and achievements
- Skills and technologies
- Any other relevant information

### 4. Run Locally

```bash
npm run dev
```

This starts a local server at `http://localhost:3000` that mimics the Vercel serverless environment.

## Embedding the Chatbot

### Method: JavaScript Widget (Recommended)

Add this single script tag to your website:

```html
<script 
  src="https://xyz-chatbot.vercel.app/api/widget" 
  data-auto-init="true">
</script>
```

### Configuration Options

```html
<script src="https://xyz-chatbot.vercel.app/api/widget"></script>
<script>
  new ChatbotWidget({
    position: 'bottom-right',    // bottom-right, bottom-left, top-right, top-left
    width: '350px',
    height: '500px',
    buttonColor: '#000000'       // Custom button color
  });
</script>
```

Or use data attributes:

```html
<script 
  src="https://xyz-chatbot.vercel.app/api/widget" 
  data-auto-init="true"
  data-position="bottom-left"
  data-button-color="#000000">
</script>
```

See `EMBED.md` for more embedding options and examples.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `OPENAI_API_KEY` in Vercel's environment variables
4. Deploy!

The project is configured for Vercel serverless functions - no build step required.

## Customization

### AI Behavior
- Edit the `PORTFOLIO_CONTEXT` and `DETAILED_KNOWLEDGE` in `api/chat.js`
- Adjust `temperature`, `max_tokens`, and other OpenAI parameters
- Switch between different GPT models

### Widget Styling
- Button color: Set via `buttonColor` option
- Position: Set via `position` option
- Size: Set via `width` and `height` options

### Chat Interface
- Modify styles in `api/embed.js` (all CSS is inline)

## API Endpoints

- `POST /api/chat` - Chat API endpoint
- `GET /api/widget` - Widget script
- `GET /api/embed` - Embed HTML page
- `GET /` - Landing page dashboard

## License

MIT License - feel free to use this project for your own portfolio!
