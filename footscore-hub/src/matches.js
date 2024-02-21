import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file for styling

const Matches = ({ selectedLeague }) => {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState({});

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/scorehub/matches/${selectedLeague}`);
        setMatches(response.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    const fetchTeams = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/scorehub/teams/${selectedLeague}`);
        const teamsData = response.data.reduce((acc, team) => {
          acc[team.id] = team.name; // Assuming each team object has an 'id' and 'name' field
          return acc;
        }, {});
        setTeams(teamsData);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchMatches();
    fetchTeams();
  }, [selectedLeague]);

  return (
    <div className="matches-container">
      <h2 className="matches-heading">{selectedLeague} Matches</h2>
      <div className="matches-list">
        {matches.map((match) => (
          <div key={match.id} className="match-card">
            <div className="teams">
              <p className="team-name">{teams[match.home_team_id]}</p>
              <p className="team-score">{match.match_score}</p>
              <p className="team-name">{teams[match.away_team_id]}</p>
            </div>
            <div className="match-details">
              <p className="date">Date: {new Date(match.match_date).toLocaleString()}</p>
              <p className="venue">Venue: {match.match_venue}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matches;

