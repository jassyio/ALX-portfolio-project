// Import necessary libraries and components
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
import popUpAd from "./popUpAd"; // Import the PopUpAd component

// Data for different leagues
const leaguesData = [
  { id: 1, name: 'Premier League' },
  { id: 2, name: 'La Liga' },
  { id: 3, name: 'Bundesliga' },
  { id: 4, name: 'Serie A' },
  { id: 5, name: 'Ligue 1' }
];

// Header component
const Header = ({ onMenuItemClick, onLeagueChange }) => {
  const [selectedLeague, setSelectedLeague] = useState('');

  // Run animation on initial render
  useEffect(() => {
    animateWebsiteName();
  }, []);

  // Handle menu item click
  const handleMenuItemClick = (item) => {
    onMenuItemClick(item);
    animateWebsiteName();
  };

  // Handle league change
  const handleLeagueChange = (e) => {
    const leagueId = e.target.value;
    setSelectedLeague(leagueId);
    onLeagueChange(leagueId);
    animateWebsiteName();
  };

  // Animate website name
  const animateWebsiteName = () => {
    const websiteName = document.querySelector('.website-name');
    if (websiteName) {
      websiteName.classList.remove('emerge');
      setTimeout(() => {
        websiteName.classList.add('emerge');
      }, 100);
    }
  };

  return (
    <header>
      {/* Blank div for ball animation */}
      <div className="blank">
        <div className="animation-container">
          <Marquee />
        </div>
      </div>

      <div className="line-break"></div>

      {/* Main heading */}
      <div className="main-heading">
        <div className="website-name"> Scorehub</div>
      </div>
      
      {/* League filter */}
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

      {/* Navigation menu */}
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

// Body component to render different pages based on selected item
// Body component to render different pages based on selected item
const Body = ({ selectedItem, selectedLeague }) => {
  switch (selectedItem) {
    case 'Matches':
      return <Matches />;
    case 'Fixtures':
      return <Fixtures />;
    case 'Table':
      return <Table selectedLeague={selectedLeague} />; // Pass down the selectedLeague prop
    case 'News':
      return <News />;
    case 'Home':
      return <Teams selectedLeague={selectedLeague} />;
    default:
      return null;
  }
};


// Layout component to structure the app layout
// Layout component to structure the app layout
const Layout = ({ children, onMenuItemClick, onLeagueChange, selectedLeague }) => (
  <div className="flex flex-col h-screen"> {/* Remove fixed width */}
    <div className="dashboard">
      <Header onMenuItemClick={onMenuItemClick} onLeagueChange={onLeagueChange} selectedLeague={selectedLeague} /> {/* Pass selectedLeague to Header */}
    </div>
    <div className="advert">
      <div>
        <Advert />
        <popUpAd /> {/* Include the PopUpAd component */}
      </div>
    </div>
    <div className="body-container" style={{ backgroundColor: '#f0f0f0', width: '100%' }}> {/* Set width to 100% */}
      {children}
    </div>
    <Footer />
  </div>
);


// Main App component
function App() {
  const [selectedItem, setSelectedItem] = useState('Home'); // Default selected item is 'Home'
  const [selectedLeague, setSelectedLeague] = useState('');

  // Handle menu item click
  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };

  // Handle league change
  const handleLeagueChange = (leagueId) => {
    setSelectedLeague(leagueId);
  };

  return (
    <Router>
      {/* Layout component */}
      <Layout onMenuItemClick={handleMenuItemClick} onLeagueChange={handleLeagueChange} selectedLeague={selectedLeague}>
        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<Body selectedItem={selectedItem} selectedLeague={selectedLeague} />} />
        
          <Route path="/fixtures" element={<Fixtures selectedLeague={selectedLeague} />} />
          <Route path="/table" element={<Table selectedLeague={selectedLeague} />} /> {/* Pass selectedLeague to Table */}
          <Route path="/news" element={<News />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/teams" element={<Teams selectedLeague={selectedLeague} />} />
          <Route path="/matches" element={<Matches selectedLeague={selectedLeague} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
