// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const table = ({ selectedLeague, selectedTeam }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.get(`YOUR_BACKEND_URL/api/table?league=${selectedLeague}&team=${selectedTeam}`);
        setTableData(response.data);
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };

    fetchTableData();
  }, [selectedLeague, selectedTeam]);

  return (
    <div>
      {/* Render tableData in your component */}
      {tableData.map((tableEntry) => (
        <div key={tableEntry.id}>{/* Render individual table entry data here */}</div>
      ))}
    </div>
  );
};

export default table;
