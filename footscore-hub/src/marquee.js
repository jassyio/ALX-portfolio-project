import React, { useState, useEffect } from 'react';

const Marquee = () => {
  // Example data for scores and fixtures
  const [marqueeData, setMarqueeData] = useState([
    { id: 1, match: 'Manchester United vs. Liverpool', score: '2 - 1' },
    { id: 2, match: 'Chelsea vs. Manchester City', score: '1 - 1' },
    // Add more fixtures as needed
  ]);

  // Example logic to fetch scores and fixtures
  useEffect(() => {
    // Your API call logic to fetch scores and fixtures would go here
    // Update the marqueeData state with the fetched data
  }, []);

  return (
    <div className="marquee">
      <p>
        {marqueeData.map((item) => (
          <span key={item.id} className="marquee-item">
            {item.match}: {item.score} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        ))}
      </p>
    </div>
  );
};

export default Marquee;
