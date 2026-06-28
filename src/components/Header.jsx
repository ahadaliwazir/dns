import React from 'react';

const Header = ({ theme, onToggleTheme }) => {
  return (
    <>
      <header className="site-header" role="banner">
        <a href="/" className="site-logo" aria-label="DNS Checker Home">
          <span className="logo-globe" aria-hidden="true">🌍</span>
          <span className="logo-text">DNS<span className="highlight">CHECKER</span></span>
        </a>
        <div className="header-right">
          <div className="header-ip" aria-label="Your IP Address">
            <span className="ip-pin" aria-hidden="true">📍</span>
            <span>Your IP</span>
          </div>
        </div>
      </header>

      <nav className="site-nav" role="navigation" aria-label="Main navigation">
        <ul className="nav-links">
          <li><a href="/" className="active" aria-current="page">Home</a></li>
          <li><a href="#dns-lookup">DNS Lookup</a></li>
          <li><a href="#all-tools">All Tools</a></li>
          <li><a href="#public-dns">Public DNS List</a></li>
        </ul>
        <div className="nav-actions">
          <button 
            className="theme-toggle" 
            onClick={onToggleTheme}
            aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
