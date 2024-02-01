// table.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Table() {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get('YOUR_STANDINGS_API_ENDPOINT'); // Replace with your API endpoint

        // Assuming standings data is available in response.data.data
        setStandings(response.data.data);
      } catch (error) {
        console.error('Error fetching standings:', error);
      }
    };

    fetchStandings();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div>
      {/* Display standings using the state variable 'standings' */}
      {standings.map((team) => (
        <div key={team.team_id}>
          {/* Render team information as needed */}
          {team.rank}. {team.team_name} - Points: {team.points}
        </div>
      ))}
    </div>
  );
}

export default Table;
