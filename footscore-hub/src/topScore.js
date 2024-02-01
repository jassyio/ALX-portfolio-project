// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopScore = ({ selectedLeague, selectedTeam }) => {
  const [topScorerData, setTopScorerData] = useState([]);

  useEffect(() => {
    const fetchTopScorerData = async () => {
      try {
        const response = await axios.get(`YOUR_BACKEND_URL/api/top-scorer?league=${selectedLeague}&team=${selectedTeam}`);
        setTopScorerData(response.data);
      } catch (error) {
        console.error('Error fetching top scorer data:', error);
      }
    };

    fetchTopScorerData();
  }, [selectedLeague, selectedTeam]);

  return (
    <div>
      {/* Render topScorerData in your component */}
      {topScorerData.map((topScorer) => (
        <div key={topScorer.id}>{/* Render individual top scorer data here */}</div>
      ))}
    </div>
  );
};

export default TopScore;
