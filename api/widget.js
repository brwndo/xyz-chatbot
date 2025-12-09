// Vercel API endpoint to serve the chatbot widget script with proper CORS headers
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Widget script content
  const widgetScript = `
(function() {
  'use strict';
  
  // Configuration
  const CHATBOT_URL = 'https://xyz-chatbot.vercel.app';
  
  // Widget class
  class ChatbotWidget {
    constructor(options = {}) {
      this.options = {
        position: options.position || 'bottom-right',
        theme: options.theme || 'light',
        width: options.width || '350px',
        height: options.height || '500px',
        buttonColor: options.buttonColor || '#ff8c42',
        ...options
      };
      
      this.isOpen = false;
      this.init();
    }
    
    init() {
      this.createStyles();
      this.createButton();
      this.createIframe();
    }
    
      createStyles() {
      const styles = \`
        @import url('https://cdn.jsdelivr.net/npm/@vercel/geist@1.0.0/dist/font.css');
        
        .chatbot-widget-button {
          position: fixed;
          \${this.getPositionStyles()}
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: \${this.options.buttonColor};
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 24px;
          color: white;
          transition: all 0.3s ease;
        }
        
        .chatbot-widget-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }
        
        .chatbot-widget-iframe {
          position: fixed;
          \${this.getPositionStyles()}
          width: \${this.options.width};
          height: \${this.options.height};
          border: none;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          z-index: 9999;
          transform: scale(0.8) translateY(20px);
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }
        
        .chatbot-widget-iframe.open {
          transform: scale(1) translateY(0);
          opacity: 1;
          pointer-events: auto;
        }
        
        @media (max-width: 768px) {
          .chatbot-widget-iframe {
            width: 100vw !important;
            height: 100vh !important;
            top: 0 !important;
            left: 0 !important;
            right: auto !important;
            bottom: auto !important;
            border-radius: 0 !important;
          }
        }
      \`;
      
      const styleSheet = document.createElement('style');
      styleSheet.textContent = styles;
      document.head.appendChild(styleSheet);
    }
    
    getPositionStyles() {
      const positions = {
        'bottom-right': 'bottom: 20px; right: 20px;',
        'bottom-left': 'bottom: 20px; left: 20px;',
        'top-right': 'top: 20px; right: 20px;',
        'top-left': 'top: 20px; left: 20px;'
      };
      return positions[this.options.position] || positions['bottom-right'];
    }
    
    createButton() {
      this.button = document.createElement('button');
      this.button.className = 'chatbot-widget-button';
      this.button.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.7134 8.12811L20.4668 8.69379C20.2864 9.10792 19.7136 9.10792 19.5331 8.69379L19.2866 8.12811C18.8471 7.11947 18.0555 6.31641 17.0677 5.87708L16.308 5.53922C15.8973 5.35653 15.8973 4.75881 16.308 4.57612L17.0252 4.25714C18.0384 3.80651 18.8442 2.97373 19.2761 1.93083L19.5293 1.31953C19.7058 0.89349 20.2942 0.89349 20.4706 1.31953L20.7238 1.93083C21.1558 2.97373 21.9616 3.80651 22.9748 4.25714L23.6919 4.57612C24.1027 4.75881 24.1027 5.35653 23.6919 5.53922L22.9323 5.87708C21.9445 6.31641 21.1529 7.11947 20.7134 8.12811ZM20 11C20.6986 11 21.3694 10.8806 21.9929 10.6611C21.9976 10.7735 22 10.8865 22 11C22 15.4183 18.4183 19 14 19V22.5C9 20.5 2 17.5 2 11C2 6.58172 5.58172 3 10 3H14C14.1135 3 14.2265 3.00237 14.3389 3.00705C14.1194 3.63061 14 4.30136 14 5C14 8.31371 16.6863 11 20 11Z" fill="currentColor"/></svg>';
      this.button.setAttribute('aria-label', 'Open chat');
      
      this.button.addEventListener('click', () => this.toggle());
      
      document.body.appendChild(this.button);
    }
    
    createIframe() {
      this.iframe = document.createElement('iframe');
      this.iframe.className = 'chatbot-widget-iframe';
      this.iframe.src = \`\${CHATBOT_URL}/embed.html\`;
      this.iframe.setAttribute('title', 'Portfolio Chatbot');
      
      document.body.appendChild(this.iframe);
    }
    
    toggle() {
      this.isOpen = !this.isOpen;
      
      if (this.isOpen) {
        this.open();
      } else {
        this.close();
      }
    }
    
    open() {
      this.iframe.classList.add('open');
      this.button.innerHTML = '✕';
      this.button.setAttribute('aria-label', 'Close chat');
    }
    
    close() {
      this.iframe.classList.remove('open');
      this.button.innerHTML = '💬';
      this.button.setAttribute('aria-label', 'Open chat');
    }
  }
  
  // Auto-initialize if data attributes are present
  document.addEventListener('DOMContentLoaded', function() {
    const scriptTag = document.querySelector('script[src*="api/widget"]');
    if (scriptTag && scriptTag.hasAttribute('data-auto-init')) {
      const options = {};
      
      // Read options from data attributes
      if (scriptTag.hasAttribute('data-position')) {
        options.position = scriptTag.getAttribute('data-position');
      }
      if (scriptTag.hasAttribute('data-theme')) {
        options.theme = scriptTag.getAttribute('data-theme');
      }
      if (scriptTag.hasAttribute('data-button-color')) {
        options.buttonColor = scriptTag.getAttribute('data-button-color');
      }
      
      new ChatbotWidget(options);
    }
  });
  
  // Expose to global scope
  window.ChatbotWidget = ChatbotWidget;
})();
`;

  res.status(200).send(widgetScript);
}
