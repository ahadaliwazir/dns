import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchPanel from './components/SearchPanel';
import ResultTable from './components/ResultTable';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { fetchDNSForServer, getAllServers } from './services/DNSProvider';

function App() {
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [searchedDomain, setSearchedDomain] = useState('');
  const [customServers, setCustomServers] = useState([]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (searchedDomain) {
      document.title = `DNS Propagation for ${searchedDomain} - DNS Checker`;
    } else {
      document.title = 'DNS Checker - Free Global DNS Propagation Check & DNS Lookup Tool';
    }
  }, [searchedDomain]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleAddServer = (server) => {
    setCustomServers(prev => [...prev, server]);
  };

  const handleRemoveServer = (id) => {
    setCustomServers(prev => prev.filter(s => s.id !== id));
  };

  const handleSearch = async (domain, type) => {
    setIsSearching(true);
    setSearchedDomain(domain);
    const allServers = [...getAllServers(), ...customServers];

    const initial = allServers.map(s => ({
      ...s,
      resolved: false,
      data: [],
      loading: true,
    }));
    setResults(initial);

    const promises = allServers.map(async (server) => {
      const result = await fetchDNSForServer(domain, type, server);
      setResults(prev => prev.map(item =>
        item.id === result.id ? result : item
      ));
    });

    await Promise.all(promises);
    setIsSearching(false);
  };

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main id="main-content" className="main-layout" role="main">
        <div className="main-left">
          <SearchPanel
            onSearch={handleSearch}
            isSearching={isSearching}
            onAddServer={handleAddServer}
            customServers={customServers}
            onRemoveServer={handleRemoveServer}
          />
          <ResultTable results={results} domain={searchedDomain} />
        </div>
        <Sidebar />
      </main>

      <Footer />
    </>
  );
}

export default App;
