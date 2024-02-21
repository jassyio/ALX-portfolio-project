import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file for styling

const Table = ({ selectedLeague }) => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    // Fetch standings data from the backend when the component mounts and when the selected league changes
    const fetchStandings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/scorehub/standings/${selectedLeague}`);
        setStandings(response.data);
      } catch (error) {
        console.error('Error fetching standings data:', error);
      }
    };

    fetchStandings();

    // Cleanup function
    return () => {
      // Cleanup code, if any
    };
  }, [selectedLeague]); // Run the effect whenever selectedLeague changes

  return (
    <div className="table-container">
      <h2 className="table-heading">{selectedLeague === 1 ? 'Premier League' : 'League Table'}</h2>
      <table className="league-table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Team Name</th>
            <th>Played</th>
            <th>Won</th>
            <th>Drawn</th>
            <th>Lost</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
  {standings.map((team, index) => (
    <tr key={team.team_id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
      <td>{index + 1}</td>
      <td>{team.team_name}</td>
      <td>{team.matches_played}</td>
      <td>{team.won}</td>
      <td>{team.drawn}</td>
      <td>{team.lost}</td>
      <td>{team.points}</td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default Table;
