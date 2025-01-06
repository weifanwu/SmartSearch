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
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "This is a sample AI response.", 
          isUser: false 
        }]);
      }, 1000);
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
