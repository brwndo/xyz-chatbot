(function() {
  'use strict';
  
  // Configuration
  const CHATBOT_URL = 'https://your-app.vercel.app'; // Replace with your actual Vercel URL
  
  // Widget class
  class ChatbotWidget {
    constructor(options = {}) {
      this.options = {
        position: options.position || 'bottom-right', // bottom-right, bottom-left, top-right, top-left
        theme: options.theme || 'light', // light, dark
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
      const styles = `
        .chatbot-widget-button {
          position: fixed;
          ${this.getPositionStyles()}
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: ${this.options.buttonColor};
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
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
          ${this.getPositionStyles()}
          width: ${this.options.width};
          height: ${this.options.height};
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
      `;
      
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
      this.button.innerHTML = '💬';
      this.button.setAttribute('aria-label', 'Open chat');
      
      this.button.addEventListener('click', () => this.toggle());
      
      document.body.appendChild(this.button);
    }
    
    createIframe() {
      this.iframe = document.createElement('iframe');
      this.iframe.className = 'chatbot-widget-iframe';
      this.iframe.src = `${CHATBOT_URL}/embed.html`;
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
    const scriptTag = document.querySelector('script[src*="chatbot-widget.js"]');
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
