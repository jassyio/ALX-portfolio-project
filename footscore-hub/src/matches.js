import React from 'react';
import matchesData from './Data/leaguesData/matches.json';
import './App.css'; // Import CSS file for styling

const Matches = () => {
  return (
    <div className="matches-container">
      <h2 className="matches-heading">Premier League Matches</h2>
      <div className="matches-list">
        {matchesData.map((match) => (
          <div key={match.id} className="match-card">
            <div className="teams">
              <p className="team-name">{match.homeTeam}</p>
              <p className="team-score">{match.score}</p>
              <p className="team-name">{match.awayTeam}</p>
            </div>
            <div className="match-details">
              <p className="date">Date: {new Date(match.date).toLocaleString()}</p>
              <p className="venue">Venue: {match.venue}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matches;
