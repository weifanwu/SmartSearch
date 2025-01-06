import React from 'react';

function Result({ messages }) {
  return (
    <div className="results">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.isUser ? 'user' : 'ai'}`}>
          <div className="message-content">
            <div className="message-header">
              {message.isUser ? (
                <span className="user-label">You</span>
              ) : (
                <span className="ai-label">AI</span>
              )}
            </div>
            <div className="message-body">
              <p>{message.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Result; 