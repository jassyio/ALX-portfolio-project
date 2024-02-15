import React from 'react';
import teamsData from './Data/leaguesData/teams.json';
import './App.css'; // Import CSS file for styling

const Teams = () => {
  return (
    <div className="teams-container">
      <h2 className="teams-heading">Premier League Teams</h2>
      <table className="teams-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Stadium</th>
            <th>Manager</th>
          </tr>
        </thead>
        <tbody>
          {teamsData.map((team) => (
            <tr key={team.id}>
              <td>{team.name}</td>
              <td>{team.stadium}</td>
              <td>{team.manager}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teams;
