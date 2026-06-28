import React, { useState } from 'react';

const RECORD_TYPES = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'PTR', 'SRV', 'SOA', 'TXT', 'CAA', 'DS', 'DNSKEY'];

const SearchPanel = ({ onSearch, isSearching, onAddServer, customServers, onRemoveServer }) => {
  const [domain, setDomain] = useState('');
  const [recordType, setRecordType] = useState('A');
  const [cdFlag, setCdFlag] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(20);

  // Panel toggles
  const [showSettings, setShowSettings] = useState(false);
  const [showAddDns, setShowAddDns] = useState(false);

  // Add DNS form state
  const [newServerName, setNewServerName] = useState('');
  const [newServerCity, setNewServerCity] = useState('');
  const [newServerCountry, setNewServerCountry] = useState('');
  const [newServerCode, setNewServerCode] = useState('');
  const [newServerProvider, setNewServerProvider] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanDomain = domain.trim();
    const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    if (!cleanDomain) return;
    if (!domainRegex.test(cleanDomain)) {
      alert("Please enter a valid domain name (e.g., google.com)");
      return;
    }
    onSearch(cleanDomain, recordType);
  };

  const handleAddServer = () => {
    if (!newServerCity.trim() || !newServerCountry.trim() || !newServerCode.trim() || !newServerProvider.trim()) {
      alert('Please fill in all fields.');
      return;
    }
    const codeRegex = /^[A-Z]{2}$/;
    if (!codeRegex.test(newServerCode.trim().toUpperCase())) {
      alert('Country code must be a 2-letter code (e.g. US, GB, DE).');
      return;
    }
    onAddServer({
      id: `custom-${Date.now()}`,
      city: newServerCity.trim(),
      country: newServerCountry.trim(),
      countryCode: newServerCode.trim().toUpperCase(),
      provider: newServerProvider.trim(),
      isCustom: true,
    });
    setNewServerCity('');
    setNewServerCountry('');
    setNewServerCode('');
    setNewServerProvider('');
    setShowAddDns(false);
  };

  return (
    <section className="check-dns-card" aria-labelledby="check-dns-heading">
      <h1 id="check-dns-heading">Check DNS</h1>

      <form onSubmit={handleSubmit} role="search" aria-label="DNS lookup form">
        <div className="search-row">
          <label htmlFor="domain-input" className="sr-only">Domain name</label>
          <input
            id="domain-input"
            type="text"
            className="domain-input"
            placeholder="example.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
            autoComplete="url"
            spellCheck="false"
            aria-describedby="domain-hint"
          />
          <span id="domain-hint" className="sr-only">Enter a domain name like google.com or example.org</span>

          <label htmlFor="record-type" className="sr-only">DNS Record Type</label>
          <select
            id="record-type"
            className="type-select"
            value={recordType}
            onChange={(e) => setRecordType(e.target.value)}
          >
            {RECORD_TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <button type="submit" className="search-btn" disabled={isSearching} aria-label="Search DNS records">
            {isSearching ? <span className="btn-spinner" aria-label="Loading"></span> : <>🔍 Search</>}
          </button>
        </div>

        <div className="options-row">
          <button
            type="button"
            className={`icon-btn settings-btn ${showSettings ? 'active' : ''}`}
            title="Settings"
            aria-label="Open settings"
            onClick={() => { setShowSettings(!showSettings); setShowAddDns(false); }}
          >⚙</button>
          <button
            type="button"
            className={`icon-btn add-btn ${showAddDns ? 'active' : ''}`}
            title="Add Custom DNS"
            aria-label="Add custom DNS server"
            onClick={() => { setShowAddDns(!showAddDns); setShowSettings(false); }}
          >+</button>

          <label className="cd-flag">
            <input
              type="checkbox"
              checked={cdFlag}
              onChange={(e) => setCdFlag(e.target.checked)}
            />
            CD Flag
          </label>

          <div className="refresh-control">
            <label>
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                aria-label="Enable auto refresh"
              />
            </label>
            <span>Refresh:</span>
            <label htmlFor="refresh-interval" className="sr-only">Refresh interval in seconds</label>
            <input
              id="refresh-interval"
              type="number"
              min="5"
              max="300"
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(e.target.value)}
            />
            <span>sec.</span>
          </div>
        </div>
      </form>

      {/* ===== SETTINGS PANEL ===== */}
      {showSettings && (
        <div className="dropdown-panel" role="dialog" aria-label="Settings">
          <h3>Settings</h3>
          <div className="settings-grid">
            <label className="settings-item">
              <input type="checkbox" checked={cdFlag} onChange={(e) => setCdFlag(e.target.checked)} />
              <div>
                <strong>CD Flag (Checking Disabled)</strong>
                <span>Disables DNSSEC validation on the resolver side</span>
              </div>
            </label>
            <label className="settings-item">
              <input type="checkbox" checked={autoRefresh} onChange={(e) => setAutoRefresh(e.target.checked)} />
              <div>
                <strong>Auto Refresh</strong>
                <span>Automatically re-run the lookup every {refreshInterval} seconds</span>
              </div>
            </label>
          </div>

          {customServers && customServers.length > 0 && (
            <div className="custom-servers-list">
              <h4>Custom DNS Servers ({customServers.length})</h4>
              {customServers.map(s => (
                <div className="custom-server-row" key={s.id}>
                  <span>{s.city}, {s.country} — <em>{s.provider}</em></span>
                  <button
                    className="remove-server-btn"
                    onClick={() => onRemoveServer(s.id)}
                    aria-label={`Remove ${s.city} server`}
                  >✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===== ADD CUSTOM DNS PANEL ===== */}
      {showAddDns && (
        <div className="dropdown-panel" role="dialog" aria-label="Add Custom DNS Server">
          <h3>Add Custom DNS Server</h3>
          <div className="add-dns-form">
            <div className="add-dns-row">
              <label htmlFor="add-city">City</label>
              <input id="add-city" type="text" placeholder="e.g. Lahore" value={newServerCity} onChange={e => setNewServerCity(e.target.value)} />
            </div>
            <div className="add-dns-row">
              <label htmlFor="add-country">Country</label>
              <input id="add-country" type="text" placeholder="e.g. Pakistan" value={newServerCountry} onChange={e => setNewServerCountry(e.target.value)} />
            </div>
            <div className="add-dns-row">
              <label htmlFor="add-code">Country Code</label>
              <input id="add-code" type="text" placeholder="e.g. PK" maxLength={2} value={newServerCode} onChange={e => setNewServerCode(e.target.value)} />
            </div>
            <div className="add-dns-row">
              <label htmlFor="add-provider">Provider</label>
              <input id="add-provider" type="text" placeholder="e.g. PTCL" value={newServerProvider} onChange={e => setNewServerProvider(e.target.value)} />
            </div>
            <button type="button" className="add-dns-submit" onClick={handleAddServer}>
              + Add Server
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchPanel;
