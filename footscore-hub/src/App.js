// Import necessary dependencies and components
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Scores from './scores';
import Table from './table';
import Fixtures from './fixtures';
import TopScore from './topScore';
import Advert from './advert'; // Remove or use it if needed
import News from './news';     // Remove or use it if needed
import Transfers from './transfers';
import './index.css';

// Header component with search functionality and filter dropdowns
const Header = ({ onFilterChange }) => {
  // State variables for search input, selected league, and selected team
  const [searchInput, setSearchInput] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [topLeaguesTeams, setTopLeaguesTeams] = useState([]);

  // Fetch top leagues and their teams when the component mounts
  useEffect(() => {
    fetchTopLeaguesTeams();
  }, []);

  // Fetch top leagues and their teams from the new API endpoint
  const fetchTopLeaguesTeams = async () => {
    try {
      const response = await axios.get('/api/leagues-teams');
      setTopLeaguesTeams(response.data);
    } catch (error) {
      console.error('Error fetching top leagues and teams:', error);
    }
  };

  // ... (rest of the code remains unchanged)
  
  // Handle league dropdown change
  const handleLeagueChange = (e) => {
    const league = e.target.value;
    setSelectedLeague(league);
    onFilterChange({ selectedLeague: league, selectedTeam });
  };

  // Handle team dropdown change
  const handleTeamChange = (e) => {
    const team = e.target.value;
    setSelectedTeam(team);
    onFilterChange({ selectedLeague, selectedTeam: team });
  };

  return (
    <header>
      {/* ... (existing code) */}
      
      {/* Filter dropdowns */}
      <div className='filter'>
        {/* League dropdown */}
        <select onChange={handleLeagueChange} value={selectedLeague}>
          <option value="">Select League</option>
          {/* Map through topLeaguesTeams and create options */}
          {topLeaguesTeams.map((league) => (
            <option key={league.league} value={league.league}>
              {league.league}
            </option>
          ))}
        </select>

        {/* Team dropdown */}
        <select onChange={handleTeamChange} value={selectedTeam}>
          <option value="">Select Team</option>
          {/* If you have a TeamsDropdown component, import and use it here */}
        </select>
      </div>
    </header>
  );
};

// Menu component for navigation
const Menu = ({ onMenuItemClick }) => {
  // State variable for selected menu item
  const [selectedItem, setSelectedItem] = useState('');

  // Handle menu item click
  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
    onMenuItemClick(item);
  };

  // Menu items with links, labels, and colors
  const menuItems = [
    { to: '/', label: 'Home', color: 'red' },
    { to: '/scores', label: 'Scores', color: 'green' },
    { to: '/topScore', label: 'Top Scorer', color: 'blue' },
    { to: '/transfers', label: 'Transfers', color: 'orange' },
    { to: '/fixtures', label: 'Fixtures', color: 'purple' },
    { to: '/table', label: 'Table', color: 'yellow' }, // Updated 'table' to 'Table'
    { to: '/news', label: 'News', color: 'cyan' },
  ];

  return (
    <nav className="menu">
      {/* Map through menuItems and create Link components */}
      {menuItems.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          className={`menu-item ${selectedItem === item.label ? 'active' : ''}`}
          style={{ backgroundColor: item.color }}
          onClick={() => handleMenuItemClick(item.label)}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

// Body component for displaying content based on selected menu item
const Body = ({ selectedItem, onFilterChange }) => {
  // Function to get content based on selected menu item
  const getContent = () => {
    if (!selectedItem) {
      // Render default content when no menu item is selected
      return { content: <div>Default content, e.g., home page</div>, backgroundColor: 'white' };
    }

    switch (selectedItem) {
      case 'Scores':
        return { content: <Scores selectedLeague={onFilterChange.selectedLeague} selectedTeam={onFilterChange.selectedTeam} />, backgroundColor: 'lightblue' };
      case 'Top Scorer':
        return { content: <TopScore selectedLeague={onFilterChange.selectedLeague} selectedTeam={onFilterChange.selectedTeam} />, backgroundColor: 'lightgreen' };
      case 'Transfers':
        return { content: <Transfers selectedLeague={onFilterChange.selectedLeague} selectedTeam={onFilterChange.selectedTeam} />, backgroundColor: 'lightcoral' };
      case 'Fixtures':
        return { content: <Fixtures selectedLeague={onFilterChange.selectedLeague} selectedTeam={onFilterChange.selectedTeam} />, backgroundColor: 'lightyellow' };
      case 'Table':
        return { content: <Table selectedLeague={onFilterChange.selectedLeague} selectedTeam={onFilterChange.selectedTeam} />, backgroundColor: 'lightyellow' }; // Updated 'table' to 'Table'
      default:
        return { content: <div>Selected item content, e.g., scores clicked</div>, backgroundColor: 'white' };
    }
  };

  const { content, backgroundColor } = getContent();

  // Render content with background color
  return (
    <div className="body" style={{ backgroundColor }}>
    

      <div className="advertisement">Area to put advertisement</div>
      <div className="main-content">{content}</div>
    </div>
  );
};

// Footer component
const Footer = () => (
  <footer>
    copyright @ scorehub 2024{/* Your footer content goes here */}
  </footer>
);

// Layout component for structuring the app layout
const Layout = ({ children, onFilterChange, topLeaguesTeams }) => (
  <div className="flex flex-col h-screen">
    <div className="dashboard">
      {/* Render Header and Menu components */}
      <Header onFilterChange={onFilterChange} topLeaguesTeams={topLeaguesTeams} />
      <Menu onMenuItemClick={onFilterChange} />
    </div>
    {children}
    {/* Render Footer component */}
    <Footer />
  </div>
);

// App component with routing and state management
function App() {
  // State variable for filter
  const [filter, setFilter] = useState({ selectedLeague: '', selectedTeam: '' });

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // State variable for top leagues teams
  const [topLeaguesTeams, setTopLeaguesTeams] = useState([]);

  // Render the app with routing and layout
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            // Render Layout component with Body as children
            <Layout onFilterChange={handleFilterChange} topLeaguesTeams={topLeaguesTeams}>
              <Body selectedItem="" onFilterChange={filter} />
            </Layout>
          }
        />
        {/* ... (similar modifications for other routes) */}
      </Routes>
    </Router>
  );
}

// Export the App component as the default export
export default App;
