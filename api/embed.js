// Vercel API endpoint to serve the embed HTML page
export default function handler(req, res) {
  // Set proper headers
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Frame-Options', 'ALLOWALL');
  res.setHeader('Content-Security-Policy', 'frame-ancestors *;');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const embedHTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Portfolio Chatbot - Embed</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        height: 100vh;
        overflow: hidden;
        background: #1a1a1a;
        color: white;
      }
      
      .app {
        height: 100vh;
        display: flex;
        flex-direction: column;
      }
      
      .chat-container {
        height: 100vh;
        background: #1a1a1a;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      
      .chat-header {
        background: #2a2a2a;
        color: white;
        padding: 16px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #333;
        flex-shrink: 0;
      }
      
      .header-content {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .profile-pic {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, #ff8c42 0%, #ff6b1a 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        border: 2px solid #ff8c42;
      }
      
      .profile-info h1 {
        font-size: 16px;
        font-weight: 600;
        margin: 0;
        color: white;
      }
      
      .messages-container {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        background: #1a1a1a;
      }
      
      .welcome-message {
        background: #2a2a2a;
        border-radius: 12px;
        padding: 20px;
        border: 1px solid #333;
        margin-bottom: 20px;
      }
      
      .welcome-message p {
        margin-bottom: 15px;
        color: #e0e0e0;
        font-size: 14px;
      }
      
      .welcome-message ul {
        list-style: none;
        padding: 0;
      }
      
      .welcome-message li {
        padding: 8px 0;
        color: #b0b0b0;
        font-size: 13px;
        position: relative;
        padding-left: 20px;
      }
      
      .welcome-message li:before {
        content: "•";
        color: #ff8c42;
        font-weight: bold;
        position: absolute;
        left: 0;
      }
      
      .message {
        margin-bottom: 16px;
        display: flex;
        align-items: flex-start;
        gap: 12px;
      }
      
      .message.user {
        flex-direction: row-reverse;
      }
      
      .message-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        flex-shrink: 0;
      }
      
      .message.user .message-avatar {
        background: #4a9eff;
      }
      
      .message.bot .message-avatar {
        background: linear-gradient(135deg, #ff8c42 0%, #ff6b1a 100%);
      }
      
      .message-content {
        background: #2a2a2a;
        border-radius: 12px;
        padding: 12px 16px;
        max-width: 80%;
        border: 1px solid #333;
        font-size: 14px;
        line-height: 1.4;
      }
      
      .message.user .message-content {
        background: #4a9eff;
        color: white;
      }
      
      .input-container {
        padding: 20px;
        background: #2a2a2a;
        border-top: 1px solid #333;
        display: flex;
        gap: 12px;
        align-items: flex-end;
        flex-shrink: 0;
      }
      
      .input-container textarea {
        flex: 1;
        background: #1a1a1a;
        border: 1px solid #333;
        border-radius: 12px;
        padding: 12px 16px;
        color: white;
        font-family: inherit;
        font-size: 14px;
        resize: none;
        min-height: 44px;
        max-height: 120px;
      }
      
      .input-container textarea:focus {
        outline: none;
        border-color: #ff8c42;
      }
      
      .input-container textarea::placeholder {
        color: #888;
      }
      
      .send-button {
        background: linear-gradient(135deg, #ff8c42 0%, #ff6b1a 100%);
        border: none;
        border-radius: 50%;
        width: 44px;
        height: 44px;
        color: white;
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        flex-shrink: 0;
      }
      
      .send-button:hover:not(:disabled) {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(255, 140, 66, 0.4);
      }
      
      .send-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      .loading-indicator {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
      }
      
      .typing-dots {
        display: flex;
        gap: 4px;
        padding: 12px 16px;
        background: #2a2a2a;
        border-radius: 12px;
        border: 1px solid #333;
      }
      
      .typing-dots span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #ff8c42;
        animation: typing 1.4s infinite ease-in-out;
      }
      
      .typing-dots span:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      .typing-dots span:nth-child(3) {
        animation-delay: 0.4s;
      }
      
      @keyframes typing {
        0%, 60%, 100% {
          transform: translateY(0);
          opacity: 0.5;
        }
        30% {
          transform: translateY(-10px);
          opacity: 1;
        }
      }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="app">
        <div class="chat-container">
          <div class="chat-header">
            <div class="header-content">
              <div class="profile-pic">😊</div>
              <div class="profile-info">
                <h1>Brandon Arthur XYZ</h1>
              </div>
            </div>
          </div>
          
          <div class="messages-container" id="messages">
            <div class="welcome-message">
              <p>👋 Hi! I'm your portfolio assistant. Feel free to ask me about:</p>
              <ul>
                <li>My projects and technical experience</li>
                <li>Skills and technologies I work with</li>
                <li>My background and career journey</li>
                <li>Anything else you'd like to know!</li>
              </ul>
            </div>
          </div>
          
          <div class="input-container">
            <textarea
              id="messageInput"
              placeholder="Ask me anything about my portfolio..."
              rows="1"
            ></textarea>
            <button id="sendButton" class="send-button">➤</button>
          </div>
        </div>
      </div>
    </div>

    <script>
      class ChatApp {
        constructor() {
          this.messages = [];
          this.isLoading = false;
          this.init();
        }

        init() {
          this.messagesContainer = document.getElementById('messages');
          this.messageInput = document.getElementById('messageInput');
          this.sendButton = document.getElementById('sendButton');

          this.sendButton.addEventListener('click', () => this.sendMessage());
          this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              this.sendMessage();
            }
          });

          this.messageInput.addEventListener('input', () => {
            this.adjustTextareaHeight();
            this.updateSendButton();
          });

          this.updateSendButton();
        }

        adjustTextareaHeight() {
          this.messageInput.style.height = 'auto';
          this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
        }

        updateSendButton() {
          this.sendButton.disabled = this.isLoading || !this.messageInput.value.trim();
        }

        async sendMessage() {
          const message = this.messageInput.value.trim();
          if (!message || this.isLoading) return;

          this.addMessage(message, 'user');
          this.messageInput.value = '';
          this.adjustTextareaHeight();
          this.setLoading(true);

          try {
            const response = await fetch('/api/chat', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ message }),
            });

            const data = await response.json();
            
            if (data.response) {
              this.addMessage(data.response, 'bot');
            } else {
              this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
            }
          } catch (error) {
            console.error('Error:', error);
            this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
          } finally {
            this.setLoading(false);
          }
        }

        addMessage(text, sender) {
          const messageEl = document.createElement('div');
          messageEl.className = \`message \${sender}\`;
          
          const avatar = document.createElement('div');
          avatar.className = 'message-avatar';
          avatar.textContent = sender === 'user' ? '👤' : '🤖';
          
          const content = document.createElement('div');
          content.className = 'message-content';
          content.textContent = text;
          
          messageEl.appendChild(avatar);
          messageEl.appendChild(content);
          
          // Remove welcome message if it exists
          const welcomeMsg = this.messagesContainer.querySelector('.welcome-message');
          if (welcomeMsg && this.messages.length === 0) {
            welcomeMsg.remove();
          }
          
          this.messagesContainer.appendChild(messageEl);
          this.messages.push({ text, sender });
          
          this.scrollToBottom();
        }

        setLoading(loading) {
          this.isLoading = loading;
          this.updateSendButton();
          
          const existingLoader = this.messagesContainer.querySelector('.loading-indicator');
          if (existingLoader) {
            existingLoader.remove();
          }
          
          if (loading) {
            const loader = document.createElement('div');
            loader.className = 'loading-indicator';
            loader.innerHTML = \`
              <div class="message-avatar" style="background: linear-gradient(135deg, #ff8c42 0%, #ff6b1a 100%);">🤖</div>
              <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            \`;
            this.messagesContainer.appendChild(loader);
            this.scrollToBottom();
          }
        }

        scrollToBottom() {
          this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }
      }

      // Initialize the chat app
      new ChatApp();
    </script>
  </body>
</html>
`;

  res.status(200).send(embedHTML);
}
