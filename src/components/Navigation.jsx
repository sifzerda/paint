import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';

function Navigation() {
  const currentPage = useLocation().pathname;

    // Function to determine active class based on current page
    function isActive(path) {
      return currentPage === path ? 'nav-link active' : 'nav-link';
    }

  // end login condition function-----------------------------------------------//

// ------------------------------- MAIN NAVIGATION LINKS ------------------//

return (
  <ul className="nav nav-tabs">
    <li className="nav-item">
      <Link to="/" className={isActive('/')}>
        Paint
      </Link>
    </li>

    <li className="nav-item">
        <Link to="/info" className={isActive('/info')}>
          Info
        </Link>
      </li>
    </ul>

  );
}

export default Navigation;
