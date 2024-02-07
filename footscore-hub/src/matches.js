// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Scores = ({ selectedLeague, selectedTeam }) => {
  const [scoresData, setScoresData] = useState([]);

  useEffect(() => {
    const fetchScoresData = async () => {
      try {
        // Replace 'YOUR_API_KEY' with your actual API key
        const response = await axios.get(`https://api.football-data.org/v4/matches?status=FINISHED&competitions=${selectedLeague}&team=${selectedTeam}`, {
          headers: {
            'X-Auth-Token': 'd2f22de8f4e40d3804c8d2b3239ef5b',
          },
        });
        setScoresData(response.data.matches); // Assuming the API response contains matches data
      } catch (error) {
        console.error('Error fetching scores data:', error);
      }
    };

    fetchScoresData();
  }, [selectedLeague, selectedTeam]);
  console.log(scoresData);

  return (
    <div>
      <h2>matches</h2>
      {/* Render scoresData in your component */}
      {scoresData.map((score) => (
        <div key={score.id}>{/* Render individual score data here */}</div>
      ))}
    </div>
  );
};

export default Scores;
