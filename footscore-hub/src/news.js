import React from 'react';
import newsData from './Data/leaguesData/news.json';
import './App.css'; // Import CSS file for styling

const News = () => {
  return (
    <div className="news-container">
      <h2 className="news-heading">Latest News</h2>
      {newsData.map(newsItem => (
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
