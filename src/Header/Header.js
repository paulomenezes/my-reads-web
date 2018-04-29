import React from 'react';

import './Header.css';

function Header(props) {
  return (
    <div className="header">
      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="logo">
              <span className="logo-my">My</span>
              <span className="logo-reads">Reads</span>
              <span className="logo-dot">.</span>
            </div>
          </div>
          <div className="column" />
          <div className="column" />
        </div>
      </div>
    </div>
  );
}

export default Header;
