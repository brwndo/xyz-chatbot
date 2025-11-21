// Root endpoint for the main deployment URL
export default function handler(req, res) {
  // Set proper headers
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const indexHTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Portfolio Chatbot - Brandon Arthur XYZ</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
        color: white;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      
      .container {
        max-width: 800px;
        text-align: center;
        background: rgba(42, 42, 42, 0.8);
        border-radius: 20px;
        padding: 40px;
        border: 1px solid #333;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
      }
      
      .logo {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, #ff8c42 0%, #ff6b1a 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        margin: 0 auto 30px;
        border: 3px solid #ff8c42;
      }
      
      h1 {
        font-size: 2.5rem;
        margin-bottom: 20px;
        background: linear-gradient(135deg, #ff8c42 0%, #ff6b1a 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .subtitle {
        font-size: 1.2rem;
        color: #b0b0b0;
        margin-bottom: 40px;
        line-height: 1.6;
      }
      
      .endpoints {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-bottom: 40px;
      }
      
      .endpoint {
        background: #1a1a1a;
        border: 1px solid #333;
        border-radius: 12px;
        padding: 20px;
        transition: all 0.3s ease;
        text-decoration: none;
        color: white;
        display: block;
      }
      
      .endpoint:hover {
        transform: translateY(-2px);
        border-color: #ff8c42;
        box-shadow: 0 8px 25px rgba(255, 140, 66, 0.2);
      }
      
      .endpoint-icon {
        font-size: 2rem;
        margin-bottom: 15px;
        display: block;
      }
      
      .endpoint-title {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 8px;
        color: #ff8c42;
      }
      
      .endpoint-desc {
        font-size: 0.9rem;
        color: #888;
        line-height: 1.4;
      }
      
      .embed-demo {
        background: #1a1a1a;
        border: 1px solid #333;
        border-radius: 12px;
        padding: 20px;
        margin-top: 30px;
      }
      
      .embed-demo h3 {
        color: #ff8c42;
        margin-bottom: 15px;
      }
      
      .embed-demo iframe {
        width: 100%;
        max-width: 400px;
        height: 500px;
        border: none;
        border-radius: 8px;
        background: #2a2a2a;
      }
      
      .footer {
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid #333;
        color: #666;
        font-size: 0.9rem;
      }
      
      @media (max-width: 768px) {
        .container {
          padding: 20px;
        }
        
        h1 {
          font-size: 2rem;
        }
        
        .endpoints {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">🤖</div>
      <h1>Portfolio Chatbot</h1>
      <p class="subtitle">
        AI-powered chatbot for Brandon Arthur XYZ's portfolio.<br>
        Embeddable on any website with multiple integration options.
      </p>
      
      <div class="endpoints">
        <a href="/embed.html" class="endpoint" target="_blank">
          <span class="endpoint-icon">💬</span>
          <div class="endpoint-title">Chat Interface</div>
          <div class="endpoint-desc">Full chat experience with AI responses about Brandon's portfolio and experience</div>
        </a>
        
        <a href="/api/embed-code" class="endpoint" target="_blank">
          <span class="endpoint-icon">📋</span>
          <div class="endpoint-title">Embed Code</div>
          <div class="endpoint-desc">Copy-paste HTML/JS code to embed the chatbot on any website</div>
        </a>
        
        <a href="/api/widget" class="endpoint" target="_blank">
          <span class="endpoint-icon">🔧</span>
          <div class="endpoint-title">Widget Script</div>
          <div class="endpoint-desc">JavaScript widget for floating chat button integration</div>
        </a>
        
        <div class="endpoint">
          <span class="endpoint-icon">📡</span>
          <div class="endpoint-title">Chat API</div>
          <div class="endpoint-desc">POST /api/chat - Direct API access for custom integrations</div>
        </div>
      </div>
      
      <div class="embed-demo">
        <h3>🎯 Live Demo</h3>
        <p style="color: #888; margin-bottom: 15px;">Try the chatbot below:</p>
        <iframe src="/embed.html" title="Portfolio Chatbot Demo"></iframe>
      </div>
      
      <div class="footer">
        <p>Built with OpenAI GPT-3.5-turbo • Deployed on Vercel • Embeddable anywhere</p>
      </div>
    </div>
  </body>
</html>
`;

  res.status(200).send(indexHTML);
}
