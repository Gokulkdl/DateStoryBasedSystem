import React from 'react';
import './StoriesList.css';

const StoriesList = ({ stories }) => {
  return (
    <div className="stories-list">
      {stories.length > 0 ? (
        stories.map((story, index) => (
          <div key={index} className="story-card">
            <p>{story}</p>
          </div>
        ))
      ) : (
        <p className="no-stories">Loading....</p>
      )}
    </div>
  );
};

export default StoriesList;
