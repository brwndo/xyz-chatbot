import React from 'react';
import './ChatMessage.css';

function ChatMessage({ message }) {
  const { text, sender, timestamp } = message;
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`message ${sender}`}>
      <div className="message-content">
        <div className="message-text">
          {text}
        </div>
        <div className="message-timestamp">
          {formatTime(timestamp)}
        </div>
      </div>
      {sender === 'bot' && (
        <div className="message-avatar">
          🤖
        </div>
      )}
      {sender === 'user' && (
        <div className="message-avatar">
          👤
        </div>
      )}
    </div>
  );
}

export default ChatMessage;
