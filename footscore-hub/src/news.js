import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file for styling

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/scorehub/news');
        setNews(response.data.articles); // Extract the articles array from the response data
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
  
    fetchNews();
  }, []);
  

  return (
    <div className="news-container">
      <h2 className="news-heading">Latest News</h2>
      {news.map(newsItem => (
        <div key={newsItem.id} className="news-card">
          <div className="news-header">
            <h3 className="news-title">{newsItem.title}</h3>
            <p className="news-category">Category: {newsItem.category}</p>
          </div>
          <p className="news-content">{newsItem.content}</p>
          {/* Add more properties as needed */}
        </div>
      ))}
    </div>
  );
};

export default News;
