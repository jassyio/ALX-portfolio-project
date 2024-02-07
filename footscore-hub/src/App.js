import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Matches from './matches'; // Changed from 'Scores' to 'Matches'
import Fixtures from './fixtures';
import Table from './table'; // Changed from 'table' to 'Table'
import News from './News';

// Header component with search functionality and filter dropdowns
const Header = ({ onFilterChange, fetchLeagues }) => {
  // State variables for search input and selected filters
  const [searchInput, setSearchInput] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [leagues] = useState([]);

  useEffect(() => {
    fetchLeagues();
  }, []);

  const handleLeagueChange = (e) => {
    const leagueId = e.target.value;
    setSelectedLeague(leagueId);
    onFilterChange({ selectedLeague: leagueId, selectedTeam });
  };

  const handleTeamChange = (e) => {
    const teamId = e.target.value;
    setSelectedTeam(teamId);
    onFilterChange({ selectedLeague, selectedTeam: teamId });
  };

  return (
    <header>
      <div className="blank">
        <div className="animation-container">
          <div className="football-left"></div>
          <div className="football-right"></div>
          <div id="scorehub" className="blast">Scorehub</div>
        </div>
      </div>

      <div className="line-break"></div>

      <div className="main-heading">
        <div className="website-name"> Scorehub</div>
      </div>
      
      {/* Search bar */}
      <form className="searchbar">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      
      {/* Dropdown filters */}
      <div className='filter'>
        {/* League dropdown */}
        <select onChange={handleLeagueChange} value={selectedLeague}>
          <option value="">Select League</option>
          {leagues.map((league) => (
            <option key={league.id} value={league.id}>
              {league.name}
            </option>
          ))}
        </select>

        {/* Team dropdown */}
        <select onChange={handleTeamChange} value={selectedTeam}>
          <option value="">Select Team</option>
        </select>
      </div>
    </header>
  );
};

// Menu component for navigation
const Menu = ({ onMenuItemClick }) => {
  // Menu items with links and labels
  const menuItems = [
    { to: '/', label: 'Home' },
    { to: '/matches', label: 'Matches' }, // Changed from 'Scores' to 'Matches'
    { to: '/fixtures', label: 'Fixtures' },
    { to: '/table', label: 'Table' },
    { to: '/news', label: 'News' },
  ];

  return (
    <nav className="menu">
      {/* Map through menuItems and create Link components */}
      {menuItems.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          className="menu-item"
          onClick={() => onMenuItemClick(item.label)}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

// Body component for displaying content based on selected menu item
const Body = ({ selectedItem }) => {
  // Render content based on selected menu item
  switch (selectedItem) {
    case 'Matches': // Changed from 'Scores' to 'Matches'
      return <Matches />;
    case 'Fixtures':
      return <Fixtures />;
    case 'Table':
      return <Table />;
    case 'News':
      return <News />;
    default:
      return <News />; // Default to 'News' component for home
  }
};

// Layout component for structuring the app layout
const Layout = ({ children, onFilterChange, fetchLeagues }) => (
  <div className="flex flex-col h-screen">
    <div className="dashboard">
      {/* Render Header and Menu components */}
      <Header onFilterChange={onFilterChange} fetchLeagues={fetchLeagues} />
      <Menu onMenuItemClick={onFilterChange} />
    </div>
    {children}
  </div>
);

// App component with routing and state management
function App() {
  // State variable for selected menu item
  const [selectedItem, setSelectedItem] = useState('');

  // Handle menu item click
  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };

  // Fetch leagues from API
  const fetchLeagues = async () => {
    try {
      const response = await axios.get('https://your-api-url/leagues');
      fetchLeagues(response.data);
    } catch (error) {
      console.error('Error fetching leagues:', error);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Route for Home */}
        <Route
          path="/"
          element={
            <Layout onFilterChange={handleMenuItemClick} fetchLeagues={fetchLeagues}>
              <Body selectedItem={selectedItem} />
            </Layout>
          }
        />
        {/* Route for Matches (formerly Scores) */}
        <Route path="/matches" element={<Matches />} />
        {/* Route for Fixtures */}
        <Route path="/fixtures" element={<Fixtures />} />
        {/* Route for Table */}
        <Route path="/table" element={<Table />} />
        {/* Route for News */}
        <Route path="/news" element={<News />} />
      </Routes>
    </Router>
  );
}

export default App;
