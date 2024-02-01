import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FixtureList() {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const response = await axios.get(
          'https://api.sportmonks.com/football/v3/fixtures/date/2024-01-21?includes=participants;scores'
        );

        setFixtures(response.data.data);
        setLoading(false);
        console.log('API Response:', response.data);
      } catch (error) {
        console.error('Error fetching fixtures:', error);
      }
    };

    fetchFixtures();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div>
      <h2>Fixture List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {fixtures.map((fixture) => (
            <li key={fixture.id}>
              {fixture.id} - {fixture.date_time} - {fixture.participants?.home_team?.name} vs {fixture.participants?.away_team?.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FixtureList;


// import React, { useEffect, useState } from 'react';

// function Scores() {
//   const [scores, setScores] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchScores = async () => {
//       try {
//         const response = await fetch('https://api.football-data.org/v4/competitions/PL/matches');
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         setScores(data.matches);
//       } catch (error) {
//         console.error('Error fetching scores:', error);
//         setError('Error fetching scores. Please check the console for details.');
//       }
//     };

//     fetchScores();
//   }, []); // Empty dependency array ensures useEffect runs only once

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       {/* Display scores using the state variable 'scores' */}
//       {scores.map((match) => (
//         <div key={match.id}>
//           {/* Render match information as needed */}
//           {match.homeTeam.name} vs {match.awayTeam.name}: {match.score.fullTime.homeTeam} - {match.score.fullTime.awayTeam}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Scores;
