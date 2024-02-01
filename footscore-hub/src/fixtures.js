// import React, { useState } from 'react';

// // Example data structure
// const exampleFixturesData = [
//   {
//     id: 1,
//     date: '2024-01-21T18:00:00Z',
//     participants: {
//       home_team: { id: 123, name: 'Home Team A' },
//       away_team: { id: 456, name: 'Away Team B' },
//     },
//   },
//   {
//     id: 2,
//     date: '2024-01-21T20:00:00Z',
//     participants: {
//       home_team: { id: 789, name: 'Home Team C' },
//       away_team: { id: 101, name: 'Away Team D' },
//     },
//   },
//   // Add more fixtures as needed
// ];

// function fixtures() {
//   // Use 'useState' without explicitly defining 'setFixtureData'
//   const [fixtureData] = useState(exampleFixturesData);

//   return (
//     <div>
//       <h2>Bundesliga Fixtures - 2024-01-21</h2>
//       <ul>
//         {fixtureData.map((fixture) => (
//           <li key={fixture.id}>
//             {fixture.id} - {fixture.date} - {fixture.participants?.home_team?.name} vs {fixture.participants?.away_team?.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default fixtures;

  