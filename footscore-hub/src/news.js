import React, { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    // Fetch data from the Flask API when the component mounts
    axios.get('http://localhost:5000/unlimited/News') // Updated URL to match Flask route
      .then(response => {
        console.log(response.data);
        setNewsData(response.data);
      })
      .catch(error => {
        console.error('Error fetching news data:', error);
      });
  }, []);

  return (
    <div style={{ backgroundColor: 'orange' }}>
      <h2>News</h2>
      {newsData.map(newsItem => (
        <div key={newsItem.id}>
          <h3>{newsItem.title}</h3>
          <p>{newsItem.content}</p>
          <p>Category: {newsItem.category}</p>
          {/* Add more properties as needed */}
        </div>
      ))}
    </div>
  );
};

export default News;
