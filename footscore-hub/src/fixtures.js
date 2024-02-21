import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file for styling

const Fixtures = ({ selectedLeague }) => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Fetch fixtures data from the backend when the component mounts and when the selected league changes
    const fetchFixtures = async () => {
      try {
        if (selectedLeague !== undefined) {
          const response = await axios.get(`http://localhost:5000/scorehub/fixtures/${selectedLeague}`);
          setFixtures(response.data);
          setLoading(false); // Set loading to false when data is fetched
        }
      } catch (error) {
        console.error('Error fetching fixtures data:', error);
      }
    };

    fetchFixtures();

    // Cleanup function
    return () => {
      // Cleanup code, if any
    };
  }, [selectedLeague]); // Run the effect whenever selectedLeague changes

  return (
    <div className="fixtures-container">
      <h2 className="fixtures-heading">{selectedLeague} Fixtures</h2>
      {loading ? ( // Display loading message if loading is true
        <p>Loading...</p>
      ) : (
        <div className="fixtures-list">
          {fixtures.map((fixture) => (
            <div key={fixture.id} className="fixture-card">
              <div className="teams">
                <p className="team-name">{fixture.home_team}</p>
                <p className="vs">vs</p>
                <p className="team-name">{fixture.away_team}</p>
              </div>
              <div className="fixture-details">
                <p className="date">Date: {new Date(fixture.date).toLocaleString()}</p>
                <p className="venue">Venue: {fixture.venue}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Fixtures;
