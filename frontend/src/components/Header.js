import React from 'react';

function Header() {
  return (
    <div className="header">
      <div className="header-content">
        <h1>SmartSearch</h1>
        <div className="header-actions">
          <button className="clear-button">Clear Chat</button>
          <button className="theme-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header; 