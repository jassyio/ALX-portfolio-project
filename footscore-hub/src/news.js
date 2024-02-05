// news.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    // Fetch data from the Flask API when the component mounts
    axios.get('http://localhost:5000/api/news') // Update the URL if your Flask app is running on a different port
      .then(response => {
        setNewsData(response.data);
      })
      .catch(error => {
        console.error('Error fetching news data:', error);
      });
  }, []);

  return (
    <div>
      <h2>News</h2>
      {newsData.map(newsItem => (
        <div key={newsItem.id}>
          <h3>{newsItem.title}</h3>
          <p>{newsItem.content}</p>
          {/* Add more properties as needed */}
        </div>
      ))}
    </div>
  );
};
export default News;
