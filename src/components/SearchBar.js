import React from 'react';

function SearchBar({ input, setInput, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask anything..."
        className="search-input"
      />
      <button type="submit" className="search-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
        </svg>
      </button>
    </form>
  );
}

export default SearchBar; 