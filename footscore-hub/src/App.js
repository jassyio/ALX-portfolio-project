import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Matches from './matches';
import Fixtures from './fixtures';
import Table from './table';
import News from './News';
import Advert from './Advert';
import Footer from "./Footer";
import Teams from "./teams";
import Marquee from "./marquee";

const leaguesData = [
  { id: 1, name: 'Premier League' },
  { id: 2, name: 'La Liga' },
  { id: 3, name: 'Bundesliga' },
  { id: 4, name: 'Serie A' },
  { id: 5, name: 'Ligue 1' }
];

const Header = ({ onMenuItemClick, onLeagueChange }) => {
  const [selectedLeague, setSelectedLeague] = useState('');

  useEffect(() => {
    animateWebsiteName();
  }, []); // Run the animation on initial render

  const handleMenuItemClick = (item) => {
    onMenuItemClick(item);
    animateWebsiteName(); // Trigger the animation on menu item click
  };

  const handleLeagueChange = (e) => {
    const leagueId = e.target.value;
    setSelectedLeague(leagueId);
    onLeagueChange(leagueId); // Pass the selected league ID to the parent component
    animateWebsiteName(); // Trigger the animation on league change
  };

  const animateWebsiteName = () => {
    const websiteName = document.querySelector('.website-name');
    if (websiteName) {
      websiteName.classList.remove('emerge');
      setTimeout(() => {
        websiteName.classList.add('emerge');
      }, 100); // Add a delay before adding the animation class to ensure re-rendering
    }
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
            {/* Marquee component within the blank div */}
            <Marquee />
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
        <Link to="/" className="menu-item" onClick={() => handleMenuItemClick('Home')}>Home</Link>
        <Link to="/matches" className="menu-item" onClick={() => handleMenuItemClick('Matches')}>Matches</Link>
        <Link to="/fixtures" className="menu-item" onClick={() => handleMenuItemClick('Fixtures')}>Fixtures</Link>
        <Link to="/table" className="menu-item" onClick={() => handleMenuItemClick('Table')}>Table</Link>
        <Link to="/news" className="menu-item" onClick={() => handleMenuItemClick('News')}>News</Link>
        <Link to="/teams" className="menu-item" onClick={() => handleMenuItemClick('Home')}>Teams</Link>
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
        <Advert />
      </div>
    </div>
    <div className="body-container" style={{ backgroundColor: '#f0f0f0' }}>
      {children}
    </div>
    <Footer />
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
