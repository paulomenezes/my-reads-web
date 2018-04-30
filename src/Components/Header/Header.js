import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

function Header(props) {
  return (
    <div className="header">
      <div className="container">
        <div className="columns">
          <div className="column is-2">
            <div className="logo">
              <Link to="/">
                <span className="logo-my">My</span>
                <span className="logo-reads">Reads</span>
                <span className="logo-dot">.</span>
              </Link>
            </div>
          </div>
          <div className="column is-6 is-offset-1" />
          <div className="column is-2 is-offset-1">
            <div className="user-sign">
              <Link to="/signin">Sign in</Link>
              <i>or</i>
              <Link to="/signup">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
