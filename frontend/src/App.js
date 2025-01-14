import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Result from './components/Result';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      
      // Start the EventSource connection with the query
      const query = encodeURIComponent(input);
      const eventSource = new EventSource(`http://localhost:8000/api/search/?query=${query}`);

      eventSource.onopen = () => {
        setIsStreaming(true);
      };

      eventSource.onmessage = (event) => {
        const newData = event.data;
        console.log('New data received:', newData);
        setMessages(prevMessages => [...prevMessages, { text: newData, isUser: false }]);
      };

      eventSource.onerror = (error) => {
        console.error('EventSource error:', error);
        eventSource.close();
        setIsStreaming(false);
      };

      // Cleanup function to close the EventSource when the component unmounts
      return () => {
        eventSource.close();
        setIsStreaming(false);
      };
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
          {isStreaming ? (
            <p>Streaming in progress...</p>
          ) : (
            <p>Connecting to stream...</p>
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