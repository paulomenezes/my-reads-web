import React from 'react';

import './Footer.css';

const Footer = props => (
  <footer className="footer">
    <div className="container">
      <div className="content has-text-centered">
        <p>
          <strong>My</strong>Reads<strong>.</strong> by{' '}
          <a href="http://github.com/paulomenezes" target="_blank">
            Paulo Menezes
          </a>.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
