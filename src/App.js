import React from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Results from './components/Results';

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      <Results />
    </div>
  );
}

export default App;
