// Table.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Table = () => {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      const response = await axios.get('/competitions');
      setCompetitions(response.data);
    } catch (error) {
      console.error('Error fetching competitions:', error);
    }
  };

  return (
    <div>
      <h2>Competition Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Country</th>
            <th>Season</th>
          </tr>
        </thead>
        <tbody>
          {competitions.map((competition) => (
            <tr key={competition.id}>
              <td>{competition.id}</td>
              <td>{competition.name}</td>
              <td>{competition.country}</td>
              <td>{competition.season}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
