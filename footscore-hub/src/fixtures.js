import React from 'react';
import fixturesData from './Data/leaguesData/fixtures.json';
import './App.css'; // Import CSS file for styling

const Fixtures = () => {
  return (
    <div className="fixtures-container">
      <h2 className="fixtures-heading">Premier League Fixtures</h2>
      <div className="fixtures-list">
        {fixturesData.map((fixture) => (
          <div key={fixture.id} className="fixture-card">
            <div className="teams">
              <p className="team-name">{fixture.homeTeam}</p>
              <p className="vs">vs</p>
              <p className="team-name">{fixture.awayTeam}</p>
            </div>
            <div className="fixture-details">
              <p className="date">Date: {new Date(fixture.date).toLocaleString()}</p>
              <p className="venue">Venue: {fixture.venue}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fixtures;
