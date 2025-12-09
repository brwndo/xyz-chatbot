// Fixed embed endpoint using the working test-clean logic
export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio Chatbot - Embed</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@vercel/geist@1.0.0/dist/font.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-weight: 400;
            font-style: normal;
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
            background: linear-gradient(135deg, #2d2d2d 0%, #2a2a2a 100%);
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
        
        .avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ff8c42 0%, #ff6b1a 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
        }
        
        .header-text h3 {
            font-size: 14px;
            font-weight: 400;
            margin: 0;
        }
        
        .header-text p {
            font-size: 12px;
            color: #999;
            margin: 0;
        }
        
        .close-button {
            display: none;
            background: transparent;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 4px;
            line-height: 1;
            transition: opacity 0.2s;
        }
        
        .close-button:hover {
            opacity: 0.7;
        }
        
        @media (max-width: 768px) {
            .close-button {
                display: block;
            }
        }
        
        .messages-container {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        
        .message {
            display: flex;
            gap: 12px;
            max-width: 85%;
            animation: fadeIn 0.3s ease-out;
        }
        
        .message.user {
            align-self: flex-end;
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
        
        .message.bot .message-avatar {
            background: #2a2a2a;
        }
        
        .message-content {
            background: #2a2a2a;
            padding: 12px 16px;
            border-radius: 18px;
            line-height: 1.4;
            word-wrap: break-word;
        }
        
        .message.user .message-content {
            background: #ff8c42;
            color: black;
        }
        
        .message-content strong {
            color: #ff8c42;
            font-weight: 600;
        }
        
        .message.user .message-content strong {
            color: #ffffff;
        }
        
        .message-content ul {
            list-style: none;
            padding-left: 15px;
            margin-top: 5px;
            margin-bottom: 5px;
        }
        
        .message-content li {
            position: relative;
            padding-left: 15px;
            margin-bottom: 5px;
            line-height: 1.4;
        }
        
        .message-content li::before {
            content: '•';
            color: #ff8c42;
            position: absolute;
            left: 0;
            top: 0;
        }
        
        .message.user .message-content li::before {
            color: #ffffff;
        }
        
        .message-content p {
            margin-bottom: 10px;
        }
        
        .message-content p:last-child {
            margin-bottom: 0;
        }
        
        .input-container {
            padding: 20px;
            background: #2a2a2a;
            border-top: 1px solid #333;
            flex-shrink: 0;
        }
        
        .input-wrapper {
            display: flex;
            gap: 12px;
            align-items: flex-end;
        }
        
        .message-input {
            flex: 1;
            background: #1a1a1a;
            border: 1px solid #333;
            border-radius: 20px;
            padding: 12px 16px;
            color: white;
            font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-size: 14px;
            line-height: 1.4;
            resize: none;
            min-height: 44px;
            max-height: 120px;
            outline: none;
            transition: border-color 0.2s;
        }
        
        .message-input:focus {
            border-color: #ff8c42;
        }
        
        .message-input::placeholder {
            color: #666;
        }
        
        .send-button {
            background: linear-gradient(135deg, #ff8c42 0%, #ff6b1a 100%);
            border: none;
            border-radius: 50%;
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            flex-shrink: 0;
        }
        
        .send-button:hover:not(:disabled) {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(255, 140, 66, 0.3);
        }
        
        .send-button:disabled {
            background: #333;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
        
        .send-button svg {
            width: 20px;
            height: 20px;
            fill: white;
        }
        
        .loading-indicator {
            display: flex;
            gap: 12px;
            max-width: 85%;
            animation: fadeIn 0.3s ease-out;
        }
        
        .typing-dots {
            background: #2a2a2a;
            padding: 12px 16px;
            border-radius: 18px;
            display: flex;
            gap: 4px;
            align-items: center;
        }
        
        .typing-dots span {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #666;
            animation: typing 1.4s infinite ease-in-out;
        }
        
        .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
        .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes typing {
            0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
            40% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .messages-container::-webkit-scrollbar {
            width: 6px;
        }
        
        .messages-container::-webkit-scrollbar-track {
            background: #1a1a1a;
        }
        
        .messages-container::-webkit-scrollbar-thumb {
            background: #333;
            border-radius: 3px;
        }
        
        .messages-container::-webkit-scrollbar-thumb:hover {
            background: #444;
        }
    </style>
</head>
<body>
    <div class="app">
        <div class="chat-container">
            <div class="chat-header">
                <div class="header-content">
                    <div class="avatar"><img src="/images/brxyz-chat-avatar.svg" alt="Bot avatar" style="width: 100%; height: 100%; object-fit: contain;"></div>
                    <div class="header-text">
                        <h3>Brawndo Bot</h3>
                    </div>
                </div>
                <button class="close-button" id="closeButton" aria-label="Close chat">✕</button>
            </div>
            
            <div class="messages-container" id="messages">
                <div class="message bot">
                    <div class="message-avatar"><img src="/images/brxyz-chat-avatar.svg" alt="Bot avatar" style="width: 100%; height: 100%; object-fit: contain;"></div>
                    <div class="message-content">
                        Hi! I'm Brandon's portfolio assistant. Ask me about his projects, experience, or anything you'd like to know about his work.
                    </div>
                </div>
            </div>
            
            <div class="input-container">
                <div class="input-wrapper">
                    <textarea 
                        id="messageInput" 
                        class="message-input" 
                        placeholder="Ask away"
                        rows="1"
                    ></textarea>
                    <button id="sendButton" class="send-button" disabled>
                        <svg viewBox="0 0 24 24">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </button>
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
                this.closeButton = document.getElementById('closeButton');

                if (!this.messagesContainer || !this.messageInput || !this.sendButton) {
                    return;
                }

                this.sendButton.addEventListener('click', () => {
                    this.sendMessage();
                });
                
                if (this.closeButton) {
                    this.closeButton.addEventListener('click', () => {
                        if (window.parent && window.parent !== window) {
                            window.parent.postMessage({ type: 'closeChatbot' }, '*');
                        }
                    });
                }
                
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
                if (this.sendButton) {
                    this.sendButton.disabled = this.isLoading || !this.messageInput.value.trim();
                }
            }

            async sendMessage() {
                const message = this.messageInput.value.trim();
                
                if (!message || this.isLoading) {
                    return;
                }

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
                    
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    this.addMessage(data.response || 'No response received', 'bot');
                } catch (error) {
                    this.addMessage('Sorry, there was an error processing your message.', 'bot');
                } finally {
                    this.setLoading(false);
                }
            }

            formatMessage(text) {
                let html = text.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>');
                const lines = html.split('\\n');
                let formattedLines = [];
                let inList = false;

                for (const line of lines) {
                    if (line.startsWith('- ')) {
                        if (!inList) {
                            formattedLines.push('<ul>');
                            inList = true;
                        }
                        formattedLines.push('<li>' + line.substring(2).trim() + '</li>');
                    } else {
                        if (inList) {
                            formattedLines.push('</ul>');
                            inList = false;
                        }
                        if (line.trim() !== '') {
                            formattedLines.push('<p>' + line.trim() + '</p>');
                        }
                    }
                }
                if (inList) {
                    formattedLines.push('</ul>');
                }
                return formattedLines.join('');
            }

            addMessage(text, sender) {
                const messageEl = document.createElement('div');
                messageEl.className = 'message ' + sender;

                const content = document.createElement('div');
                content.className = 'message-content';
                
                if (sender === 'bot') {
                    const avatar = document.createElement('div');
                    avatar.className = 'message-avatar';
                    const avatarImg = document.createElement('img');
                    avatarImg.src = '/images/brxyz-chat-avatar.svg';
                    avatarImg.alt = 'Bot avatar';
                    avatarImg.style.width = '100%';
                    avatarImg.style.height = '100%';
                    avatarImg.style.objectFit = 'contain';
                    avatar.appendChild(avatarImg);
                    messageEl.appendChild(avatar);
                    
                    const formattedText = this.formatMessage(text);
                    content.innerHTML = formattedText;
                } else {
                    content.textContent = text;
                }

                messageEl.appendChild(content);
                
                this.messagesContainer.appendChild(messageEl);
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
                    loader.innerHTML = '<div class="message-avatar"><img src="/images/brxyz-chat-avatar.svg" alt="Bot avatar" style="width: 100%; height: 100%; object-fit: contain;"></div><div class="typing-dots"><span></span><span></span><span></span></div>';
                    this.messagesContainer.appendChild(loader);
                    this.scrollToBottom();
                }
            }

            scrollToBottom() {
                this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
            }
        }

        // Initialize when DOM is ready
        function initChat() {
            new ChatApp();
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initChat);
        } else {
            initChat();
        }
    </script>
</body>
</html>`;

  res.send(html);
}
