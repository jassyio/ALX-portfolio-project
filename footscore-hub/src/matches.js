// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const matches = ({ selectedLeague, selectedTeam }) => {
  const [matchesData, setmatchesData] = useState([]);

  useEffect(() => {
    const fetchmatchesData = async () => {
      try {
        // Replace 'YOUR_API_KEY' with your actual API key
        const response = await axios.get(`https://api.football-data.org/v4/matches?status=FINISHED&competitions=${selectedLeague}&team=${selectedTeam}`, {
          headers: {
            'X-Auth-Token': 'd2f22de8f4e40d3804c8d2b3239ef5b',
          },
        });
        setmatchesData(response.data.matches); // Assuming the API response contains matches data
      } catch (error) {
        console.error('Error fetching matches data:', error);
      }
    };

    fetchmatchesData();
  }, [selectedLeague, selectedTeam]);
  console.log(matchesData);

  return (
    <div>
      <h2>matches</h2>
      {/* Render matchesData in your component */}
      {matchesData.map((score) => (
        <div key={score.id}>{/* Render individual score data here */}</div>
      ))}
    </div>
  );
};

export default matches;
