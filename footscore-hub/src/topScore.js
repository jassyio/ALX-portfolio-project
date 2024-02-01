// TopScore.js

import React from 'react';

const TopScore = () => {
  // Sample data for top scorers in the EPL
  const topScorers = [
    { rank: 1, name: 'Player 1', goals: 20 },
    { rank: 2, name: 'Player 2', goals: 18 },
    { rank: 3, name: 'Player 3', goals: 15 },
    // Add more players as needed
  ];

  return (
    <div>
      <h2>Top Scorers - EPL</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Goals</th>
          </tr>
        </thead>
        <tbody>
          {topScorers.map((player) => (
            <tr key={player.rank}>
              <td>{player.rank}</td>
              <td>{player.name}</td>
              <td>{player.goals}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopScore;
