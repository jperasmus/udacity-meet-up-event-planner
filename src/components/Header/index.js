import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import './index.css';

const Header = (props) => {
  return (
    <header className="app-header">
      <nav className="app-header-nav">
        <ul>
          <li>
            <Link to="/create-event" activeClassName="active">Create Event</Link>
          </li>
          <li>
            <Link to="/account" activeClassName="active">Account</Link>
          </li>
        </ul>
      </nav>
      <h2 className="app-logo">
        <Link to="/">Rendezvous</Link>
      </h2>
    </header>
  );
};

Header.propTypes = {};
Header.defaultProps = {};

export default Header;
