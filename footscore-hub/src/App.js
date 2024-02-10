import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Matches from './matches';
import Fixtures from './fixtures';
import Table from './table';
import News from './News';
import Advert from './Advert';
import Footer from "./Footer";

const Header = ({ onFilterChange }) => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [competitions, setCompetitions] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/unlimited/competitions');
        setCompetitions(response.data);
      } catch (error) {
        console.error('Error fetching competitions:', error);
      }
    };

    fetchData();
  }, []);

  

  const handleCompetitionChange = async (e) => {
    const competitionId = e.target.value;
    setSelectedCompetition(competitionId);
    onFilterChange({ selectedCompetition: competitionId, selectedTeam });
    try {
      const response = await axios.get(`/unlimited/competitions/${competitionId}/teams`);
      setTeams(response.data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleTeamChange = (e) => {
    const teamId = e.target.value;
    setSelectedTeam(teamId);
    onFilterChange({ selectedCompetition, selectedTeam: teamId });
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
        <select onChange={handleCompetitionChange} value={selectedCompetition}>
          <option value="">Select Competition</option>
          {competitions.map((competition) => (
            <option key={competition.id} value={competition.id}>
              {competition.name}
            </option>
          ))}
        </select>

        <select onChange={handleTeamChange} value={selectedTeam}>
          <option value="">Select Team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};

const Menu = ({ onMenuItemClick }) => {
  const menuItems = [
    { to: '/', label: 'Home', bgColor: '#87421f' },
    { to: '/matches', label: 'Matches', bgColor: 'goldenrod' },
    { to: '/fixtures', label: 'Fixtures', bgColor: 'pink' },
    { to: '/table', label: 'Table', bgColor: '#8B4513' },
    { to: '/news', label: 'News', bgColor: '#32CD32' },
  ];

  return (
    <nav className="menu">
      {menuItems.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          className="menu-item"
          onClick={() => onMenuItemClick(item.label)}
          style={{ backgroundColor: item.bgColor }}
        >
          {item.label}
        </Link>
      ))}
    </nav>
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

const Layout = ({ children, onFilterChange }) => (
  <div className="flex flex-col h-screen">
    <div className="dashboard">
      <Header onFilterChange={onFilterChange} />
      <Menu onMenuItemClick={onFilterChange} />
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
      <Layout onFilterChange={handleMenuItemClick}>
        <Routes>
          <Route
            path="/"
            element={<Body selectedItem={selectedItem} />}
          />
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
