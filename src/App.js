import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StoriesList from './components/StoriesList';
import FetchStories from './components/FetchStories';
import './App.css';

const App = () => {
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [date, setDate] = useState('');

  // Update filtered stories based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredStories(stories);
    } else {
      const filtered = stories.filter((story) =>
        story.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStories(filtered);
    }
  }, [searchQuery, stories]);

  return (
    <div>
      <div className="app">
      <Navbar />
      
      <FetchStories date={date} setDate={setDate} setStories={setStories} setFilteredStories={setFilteredStories} />
      <input
          type="text"
          className="search-bar"
          placeholder="Search stories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="app">
        {/* FetchStories Component */}
        



        {/* Stories list */}
        <StoriesList stories={filteredStories} />
      </div>
    </div>     
  </div>
  );
};

export default App;
