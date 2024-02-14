import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Matches from './matches';
import Fixtures from './fixtures';
import Table from './table';
import News from './News';
import Advert from './Advert';
import Footer from "./Footer";

const Header = ({ onLeagueChange, onMenuItemClick }) => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.get('http://localhost:5000/scorehub/leagues');
        setLeagues(response.data);
      } catch (error) {
        console.error('Error fetching leagues:', error);
      }
    };

    fetchLeagues();
  }, []);

  const handleLeagueChange = (e) => {
    const leagueId = e.target.value;
    setSelectedLeague(leagueId);
    onLeagueChange(leagueId);
  };

  const handleMenuItemClick = (item) => {
    onMenuItemClick(item);
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
        
        <form className="searchbar">
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      
      <div className='filter'>
        <select onChange={handleLeagueChange} value={selectedLeague}>
          <option value="">Select League</option>
          {leagues.map((league) => (
            <option key={league.id} value={league.id}>
              {league.name}
            </option>
          ))}
        </select>
      </div>

      <nav className="menu">
        <Link to="/" className="menu-item" onClick={() => handleMenuItemClick('Home')} style={{ backgroundColor: '#87421f' }}>Home</Link>
        <Link to="/matches" className="menu-item" onClick={() => handleMenuItemClick('Matches')} style={{ backgroundColor: 'goldenrod' }}>Matches</Link>
        <Link to="/fixtures" className="menu-item" onClick={() => handleMenuItemClick('Fixtures')} style={{ backgroundColor: 'pink' }}>Fixtures</Link>
        <Link to="/table" className="menu-item" onClick={() => handleMenuItemClick('Table')} style={{ backgroundColor: '#8B4513' }}>Table</Link>
        <Link to="/news" className="menu-item" onClick={() => handleMenuItemClick('News')} style={{ backgroundColor: '#32CD32' }}>News</Link>
      </nav>
    </header>
  );
};

const Body = ({ selectedItem }) => {
  switch (selectedItem) {
    case 'Matches':
      return <Matches />;
    case 'Fixtures':
      return <Fixtures />;
    case 'Table':
      return <Table />;
    case 'News':
      return <News />;
    default:
      return <News />;
  }
};

const Layout = ({ children, onMenuItemClick }) => (
  <div className="flex flex-col h-screen">
    <div className="dashboard">
      <Header onMenuItemClick={onMenuItemClick} />
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

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <Router>
      <Layout onMenuItemClick={handleMenuItemClick}>
        <Routes>
          <Route path="/" element={<Body selectedItem={selectedItem} />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/table" element={<Table />} />
          <Route path="/news" element={<News />} />
          <Route path="/advert" element={<Advert />} />
          <Route path="/footer" element={<Footer />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
