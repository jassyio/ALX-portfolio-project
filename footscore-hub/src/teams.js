import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Teams = ({ selectedLeague }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/scorehub/teams/${selectedLeague}`);
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams data:', error);
      }
    };

    fetchTeams();
  }, [selectedLeague]);

  return (
    <div>
      <h2>Teams</h2>
      <div className="teams-container">
        {teams.map((team) => (
          <div key={team.id} className="team-card">
            <img src={team.logo} alt={team.name} />
            <h3>{team.name}</h3>
            <p>Stadium: {team.stadium}</p>
            <p>Manager: {team.manager}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
