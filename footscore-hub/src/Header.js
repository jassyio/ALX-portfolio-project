// Header.js

import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
      <div>
        {/* Website Name and Logo */}
        <h1>Your Sports Website</h1>
        <img src="/path/to/your/logo.png" alt="Logo" />
      </div>
      <nav>
        {/* Navigation Links */}
        <ul>
          <li>
            
          </li>
          <li>
            <Link to="/scores">Scores</Link>
          </li>
          <li>
            <Link to="/standings">Table</Link>
          </li>
          <li>
            <Link to="/fixtures">Fixtures</Link>
          </li>
          <li>
            <Link to="/topScore">Top Score</Link>
          </li>
          <li>
            <Link to="/fixtures">fixtures</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
