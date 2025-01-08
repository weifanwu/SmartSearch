import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Result from './components/Result';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      
    // ... existing code ...
    fetch(`/api/search?q=${encodeURIComponent(input)}&format=json`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Combine all URLs into a single message
      if (data.results && data.results.length > 0) {
        const allUrls = data.results.map(result => result.url).join('\n');
        setMessages(prev => [...prev, { 
          text: allUrls, 
          isUser: false 
        }]);
      } else {
        setMessages(prev => [...prev, { 
          text: "No results found.", 
          isUser: false 
        }]);
      }
    })
    .catch(error => {
      console.error('Error fetching search results:', error);
      setMessages(prev => [...prev, { 
        text: "Error fetching search results.", 
        isUser: false 
      }]);
    });
    // ... existing code ...

      setInput('');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <Header />
        <main className="main-content">
          {messages.length === 0 ? (
            <div className="empty-state">
              <h2>Ask me anything</h2>
              <p>I'm an AI ready to help answer your questions</p>
            </div>
          ) : (
            <Result messages={messages} />
          )}
        </main>
        <footer className="footer">
          <SearchBar 
            input={input} 
            setInput={setInput} 
            handleSubmit={handleSubmit}
          />
        </footer>
      </div>
    </div>
  );
}

export default App;
