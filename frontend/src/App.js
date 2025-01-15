import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Result from './components/Result';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const eventSourceRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, isUser: true },
      ]);
      setInput(''); 

      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }

      const query = encodeURIComponent(input);
      const eventSource = new EventSource(
        `http://localhost:8000/api/search/?query=${query}`
      );
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        setIsStreaming(true);
      };

      eventSource.onmessage = (event) => {
        const newMessageChunk = event.data;

        setMessages((prevMessages) => {
          if (prevMessages.length > 0 && !prevMessages[prevMessages.length - 1].isUser) {
            const updatedMessages = [...prevMessages];
            updatedMessages[updatedMessages.length - 1].text += newMessageChunk;
            return updatedMessages;
          } else {
            return [...prevMessages, { text: newMessageChunk, isUser: false }];
          }
        });
      };

      eventSource.onerror = (error) => {
        console.error('EventSource error:', error);
        eventSource.close();
        setIsStreaming(false);
      };
    }
  };

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

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