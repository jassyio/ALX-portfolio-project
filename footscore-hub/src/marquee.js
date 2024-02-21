import React, { useState, useEffect } from 'react';

const Marquee = () => {
  // Example data for scores
  const [marqueeData, setMarqueeData] = useState([
    { id: 1, homeTeam: "Manchester United", awayTeam: "Liverpool", homeScore: 2, awayScore: 1 },
    { id: 2, homeTeam: "Chelsea", awayTeam: "Manchester City", homeScore: 1, awayScore: 1 },
    { id: 3, homeTeam: "Arsenal", awayTeam: "Tottenham Hotspur", score: "3 - 2" },
    { id: 4, homeTeam: "Leicester City", awayTeam: "Everton", score: "2 - 0" },
    { id: 5, homeTeam: "West Ham United", awayTeam: "Southampton", score: "2 - 1" },
    { id: 6, homeTeam: "Aston Villa", awayTeam: "Crystal Palace", score: "0 - 1" },
    { id: 7, homeTeam: "Brighton & Hove Albion", awayTeam: "Newcastle United", score: "1 - 1" },
    { id: 8, homeTeam: "Leeds United", awayTeam: "Wolverhampton Wanderers", score: "2 - 2" },
    { id: 9, homeTeam: "Burnley", awayTeam: "Fulham", score: "0 - 0" },
    { id: 10, homeTeam: "Norwich City", awayTeam: "Watford", score: "1 - 0" },
  ]);

  return (
    <div className="animation-container">
      <div className="marquee-container">
        <div className="marquee">
          {marqueeData.map((item) => (
            <span key={item.id} className="marquee-item">
              {item.homeTeam} {item.homeScore} - {item.awayScore} {item.awayTeam}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
