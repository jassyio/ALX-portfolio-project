import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Matches from './matches';
import Fixtures from './fixtures';
import Table from './table';
import News from './News';
import Advert from './Advert';
import Footer from "./Footer";
import Teams from "./teams";

const leaguesData = [
  { id: 1, name: 'Premier League' },
  { id: 2, name: 'La Liga' },
  { id: 3, name: 'Bundesliga' },
  { id: 4, name: 'Serie A' },
  { id: 5, name: 'Ligue 1' }
];

const Header = ({ onMenuItemClick, onLeagueChange }) => {
  const [selectedLeague, setSelectedLeague] = useState('');

  const handleLeagueChange = (e) => {
    const leagueId = e.target.value;
    setSelectedLeague(leagueId);
    onLeagueChange(leagueId); // Pass the selected league ID to the parent component
  };

  return (
    <header>
      <div className="blank">
        <div className="animation-container">
          <div className="football-left"></div>
          <div className="football-right"></div>
          <div className="updates-container">
            <div className="updates">
              <span>Upcoming Website</span>
            </div>
          </div>
        </div>
      </div>

      <div className="line-break"></div>

      <div className="main-heading">
        <div className="website-name"> Scorehub</div>
      </div>
      
      <div className='filter'>
        <select onChange={handleLeagueChange} value={selectedLeague}>
          <option value="">Select League</option>
          {leaguesData.map((league) => (
            <option key={league.id} value={league.id}>
              {league.name}
            </option>
          ))}
        </select>
      </div>

      <nav className="menu">
        <Link to="/" className="menu-item" onClick={() => onMenuItemClick('Home')} style={{ backgroundColor: '#87421f' }}>Home</Link>
        <Link to="/matches" className="menu-item" onClick={() => onMenuItemClick('Matches')} style={{ backgroundColor: 'goldenrod' }}>Matches</Link>
        <Link to="/fixtures" className="menu-item" onClick={() => onMenuItemClick('Fixtures')} style={{ backgroundColor: 'pink' }}>Fixtures</Link>
        <Link to="/table" className="menu-item" onClick={() => onMenuItemClick('Table')} style={{ backgroundColor: '#8B4513' }}>Table</Link>
        <Link to="/news" className="menu-item" onClick={() => onMenuItemClick('News')} style={{ backgroundColor: '#32CD32' }}>News</Link>
        <Link to="/teams" className="menu-item" onClick={() => onMenuItemClick('Home')} style={{ backgroundColor: '#32CD32' }}>Teams</Link>
      </nav>
    </header>
  );
};

const Body = ({ selectedItem, selectedLeague }) => {
  switch (selectedItem) {
    case 'Matches':
      return <Matches />;
    case 'Fixtures':
      return <Fixtures />;
    case 'Table':
      return <Table selectedLeague={selectedLeague} />;
    case 'News':
      return <News />;
    case 'Home':
      return <Teams selectedLeague={selectedLeague} />;
    default:
      return null;
  }
};

const Layout = ({ children, onMenuItemClick, onLeagueChange }) => (
  <div className="flex flex-col h-screen">
    <div className="dashboard">
      <Header onMenuItemClick={onMenuItemClick} onLeagueChange={onLeagueChange} />
    </div>
    <div className="advert">
      <div>
        <Advert/>
      </div>
    </div>
    <div className="body-container" style={{ backgroundColor: '#f0f0f0' }}>
      {children}
    </div>
    <Footer/>
  </div>
);

function App() {
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleLeagueChange = (leagueId) => {
    setSelectedLeague(leagueId);
  };

  return (
    <Router>
      <Layout onMenuItemClick={handleMenuItemClick} onLeagueChange={handleLeagueChange}>
        <Routes>
          <Route path="/" element={<Body selectedItem={selectedItem} selectedLeague={selectedLeague} />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/table" element={<Table />} />
          <Route path="/news" element={<News />} />
          <Route path="/advert" element={<Advert />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/teams" element={<Teams selectedLeague={selectedLeague} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
