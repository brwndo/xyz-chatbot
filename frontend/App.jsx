import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
      });

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="app">
      {/* Chat Toggle Button */}
      <button 
        className={`chat-toggle-btn ${isChatOpen ? 'open' : ''}`}
        onClick={toggleChat}
        aria-label={isChatOpen ? 'Close chat' : 'Open chat'}
      >
        {isChatOpen ? '✕' : '💬'}
      </button>

      {/* Chat Container */}
      <div className={`chat-container ${isChatOpen ? 'open' : 'closed'}`}>
        <div className="chat-header">
          <div className="header-content">
            <div className="profile-pic">
              😊
            </div>
            <div className="profile-info">
              <h1>Brandon Arthur XYZ</h1>
            </div>
          </div>
          <button 
            className="close-btn"
            onClick={toggleChat}
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>
        
        <div className="messages-container">
          {messages.length === 0 && (
            <div className="welcome-message">
              <p>👋 Hi! I'm your portfolio assistant. Feel free to ask me about:</p>
              <ul>
                <li>My projects and technical experience</li>
                <li>Skills and technologies I work with</li>
                <li>My background and career journey</li>
                <li>Anything else you'd like to know!</li>
              </ul>
            </div>
          )}
          
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isLoading && (
            <div className="loading-indicator">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>
        
        <div className="input-container">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about my portfolio..."
            rows="3"
            disabled={isLoading}
          />
            <button 
            onClick={sendMessage} 
            disabled={isLoading || !inputValue.trim()}
            className="send-button"
            aria-label="Send message"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
