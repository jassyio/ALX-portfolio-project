import React from 'react';
import tableData from './Data/leaguesData/table.json';
import './App.css'; // Import CSS file for styling

const Table = () => {
  return (
    <div className="table-container">
      <h2 className="table-heading">Premier League Table</h2>
      <table className="premier-league-table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Team</th>
            <th>Played</th>
            <th>Won</th>
            <th>Drawn</th>
            <th>Lost</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((team, index) => (
            <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{team.position}</td>
              <td>{team.team}</td>
              <td>{team.played}</td>
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
