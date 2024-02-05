import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Scores from './scores';
import Table from './table';
import Fixtures from './fixtures';
import TopScore from './topScore';
import Advert from './Advert'; // Remove or use it if needed
import News from './News';     // Remove or use it if needed
import Transfers from './transfers';
import './index.css';

// Header component with search functionality and filter dropdowns
const Header = ({ onFilterChange, topLeaguesTeams }) => {
  // State variables for search input, selected league, and selected team
  const [searchInput, setSearchInput] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');

  // Fetch top leagues and their teams when the component mounts
  useEffect(() => {
    fetchTopLeaguesTeams();
  }, []);

  // Fetch top leagues and their teams from the football-data API
  const fetchTopLeaguesTeams = async () => {
    try {
      // Replace 'YOUR_API_KEY' with your actual football-data.org API key
      const apiKey = 'YOUR_API_KEY';
      const response = await axios.get(`https://api.football-data.org/v2/competitions?plan=TIER_ONE&areas=2077,2072,2076,2081,2114,2088,2087,2119,2080&seasons=2023`, {
        headers: {
          'X-Auth-Token': apiKey,
        },
      });
      // Set the fetched data to state
      topLeaguesTeams(response.data.competitions);
    } catch (error) {
      console.error('Error fetching top leagues and teams:', error);
    }
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search submitted:', searchInput);
    // Perform search logic here with 'searchInput' value
  };

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
      {/* Blank div for animations or other content */}
      <div className="blank">{/* You can add animations or other content here later */} animation</div>
      {/* Line break for styling */}
      <div className="line-break"></div>

      <div className="main-heading">
        {/* Website name */}
        <div className="website-name"> Scorehub</div>

        {/* Search bar */}
        <form className="searchbar" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <button type="submit">Search</button>
        </form>

        {/* Line break for styling */}
        <div className="line-break"></div>
      </div>
      
      {/* Filter dropdowns */}
      <div className='filter'>
        {/* League dropdown */}
        <select onChange={handleLeagueChange} value={selectedLeague}>
          <option value="">Select League</option>
          {/* Map through topLeaguesTeams and create options */}
          {topLeaguesTeams.map((league) => (
            <option key={league.id} value={league.id}>
              {league.name}
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
      case 'News':
        return { content: <News />, backgroundColor: 'lightyellow' };      
      case 'Advert':
        return { content: <Advert />, backgroundColor: 'lightyellow' }; 
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
        <Route path="/news" element={<News />} /> {/* Route for the News component */}

      </Routes>
      
    </Router>
  );
}

// Export the App component as the default export
export default App;