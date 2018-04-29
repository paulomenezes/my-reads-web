import React from 'react';

import './Header.css';

function Header(props) {
  return (
    <div className="header">
      <div className="container">
        <div className="columns">
          <div className="column is-2">
            <div className="logo">
              <span className="logo-my">My</span>
              <span className="logo-reads">Reads</span>
              <span className="logo-dot">.</span>
            </div>
          </div>
          <div className="column is-6 is-offset-1" />
          <div className="column is-2 is-offset-1">
            <a href="/signin">Sign in</a>
            or
            <a href="/signup">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
