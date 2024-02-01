// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Scores = ({ selectedLeague, selectedTeam }) => {
  const [scoresData, setScoresData] = useState([]);

  useEffect(() => {
    const fetchScoresData = async () => {
      try {
        const response = await axios.get(`YOUR_BACKEND_URL/api/scores?league=${selectedLeague}&team=${selectedTeam}`);
        setScoresData(response.data);
      } catch (error) {
        console.error('Error fetching scores data:', error);
      }
    };

    fetchScoresData();
  }, [selectedLeague, selectedTeam]);

  return (
    <div>
      {/* Render scoresData in your component */}
      {scoresData.map((score) => (
        <div key={score.id}>{/* Render individual score data here */}</div>
      ))}
    </div>
  );
};

export default Scores;
