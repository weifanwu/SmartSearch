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
      
      const backendUrl = 'http://localhost:8000';
      fetch(`${backendUrl}/api/search?query=${encodeURIComponent(input)}`)
        .then(response => response.json())
        .then(data => {
          const combinedMessage = `${data.answer}\n`;
          setMessages(prev => [...prev, { 
            text: combinedMessage, 
            isUser: false 
          }]);
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
          setMessages(prev => [...prev, { 
            text: "Error fetching search results.", 
            isUser: false 
          }]);
        });
  
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
