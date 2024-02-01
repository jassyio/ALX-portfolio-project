import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Scores from './scores';
import Table from './table';
import Fixtures from './fixtures';
import TopScore from './topScore';
import Advert from './advert';
import News from './news';
import Transfers from './transfers';
import './index.css';

const Header = () => (
  <header>
    <div className="blank"> {/* You can add animations or other content here later */}</div>
    <div className="main-heading">
      <div className="website-name">bigstylish "scorehub"</div>
      <div className="searchbar"> {/* Align to the right using CSS */}Search Bar</div>
    </div>
  </header>
);

const Menu = () => (
  <nav className="menu">
    <div className="leagues">Leagues</div>
    <div className="scores">Scores</div>
    <div className="fixtures">Fixtures</div>
    <div className="transfers">Transfers</div>
    <div className="topscorer">Top Scorer</div>
    <div className="news">News</div>
    <div className="home">Home</div>
    {/* Add horizontal lines or other separators */}
  </nav>
);

const Body = () => (
  <div className="body">
    <div className="advertisement">Area to put advertisement</div>
    <div className="main-content">Selected item content, e.g., scores clicked</div>
  </div>
);

const Footer = () => (
  <footer>
    {/* Your footer content goes here */}
  </footer>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Header />
              <Menu />
              <Body />
              <Footer />
            </div>
          }
        />
        <Route path="/scores" element={<Scores />} />
        <Route path="/topScore" element={<TopScore />} />
        <Route path="/transfers" element={<Transfers />} />
        <Route path="/fixtures" element={<Fixtures />} />
        <Route path="/standings" element={<Table />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </Router>
  );
}

export default App;
