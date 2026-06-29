import React from 'react';

const Header = ({ theme, onToggleTheme, currentTab, onTabChange }) => {
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
          <li>
            <a 
              href="#" 
              className={currentTab === 'home' ? 'active' : ''} 
              aria-current={currentTab === 'home' ? 'page' : undefined}
              onClick={(e) => { e.preventDefault(); onTabChange('home'); }}
            >Home</a>
          </li>
          <li>
            <a 
              href="#dns-lookup" 
              className={currentTab === 'dns-lookup' ? 'active' : ''} 
              aria-current={currentTab === 'dns-lookup' ? 'page' : undefined}
              onClick={(e) => { e.preventDefault(); onTabChange('dns-lookup'); }}
            >DNS Lookup</a>
          </li>
          <li>
            <a 
              href="#all-tools" 
              className={currentTab === 'all-tools' ? 'active' : ''} 
              aria-current={currentTab === 'all-tools' ? 'page' : undefined}
              onClick={(e) => { e.preventDefault(); onTabChange('all-tools'); }}
            >All Tools</a>
          </li>
          <li>
            <a 
              href="#public-dns" 
              className={currentTab === 'public-dns' ? 'active' : ''} 
              aria-current={currentTab === 'public-dns' ? 'page' : undefined}
              onClick={(e) => { e.preventDefault(); onTabChange('public-dns'); }}
            >Public DNS List</a>
          </li>
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
