import React from 'react';

const Sidebar = () => {
  const continents = [
    { name: 'Africa', emoji: '🌍' },
    { name: 'Asia', emoji: '🌏' },
    { name: 'Europe', emoji: '🌍' },
    { name: 'North America', emoji: '🌎' },
    { name: 'Australia / Oceania', emoji: '🌏' },
    { name: 'South America', emoji: '🌎' },
  ];

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'JP', name: 'Japan' },
    { code: 'AU', name: 'Australia' },
    { code: 'BR', name: 'Brazil' },
    { code: 'CA', name: 'Canada' },
    { code: 'IN', name: 'India' },
    { code: 'SG', name: 'Singapore' },
    { code: 'KR', name: 'South Korea' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
    { code: 'RU', name: 'Russia' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'MX', name: 'Mexico' },
    { code: 'PK', name: 'Pakistan' },
    { code: 'TR', name: 'Turkey' },
    { code: 'SE', name: 'Sweden' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'PL', name: 'Poland' },
    { code: 'NO', name: 'Norway' },
    { code: 'FI', name: 'Finland' },
  ];

  return (
    <aside className="main-right" role="complementary" aria-label="DNS information and tools">
      {/* Propagation Info */}
      <section className="info-card" aria-labelledby="propagation-heading">
        <h2 id="propagation-heading">Check DNS Propagation</h2>
        <p>
          Whether you have recently changed your DNS records, switched web host, or started a new website, 
          checking whether the DNS records are propagated globally is essential. DNS Checker provides a free 
          DNS propagation check service to check Domain Name System records in multiple regions worldwide. 
          Perform a quick DNS propagation lookup using DNS data collected from all available DNS Servers to 
          confirm that the website records are fully propagated.
        </p>
      </section>

      {/* DNS Lists */}
      <section className="sidebar-card" aria-labelledby="dns-lists-heading">
        <h3 id="dns-lists-heading">DNS Lists</h3>
        <label htmlFor="sidebar-search" className="sr-only">Search DNS servers</label>
        <input 
          id="sidebar-search"
          type="text" 
          className="sidebar-search" 
          placeholder="Instant search..." 
        />
        <div className="filter-pills" role="group" aria-label="IP version filter">
          <button className="filter-pill active" aria-pressed="true">Public IPv4</button>
          <button className="filter-pill" aria-pressed="false">Public IPv6</button>
        </div>

        <nav aria-label="DNS servers by continent">
          <ul className="continent-list">
            {continents.map(c => (
              <li key={c.name}>
                <span aria-hidden="true">{c.emoji}</span>
                <a href={`#dns-${c.name.toLowerCase().replace(/\s+/g, '-')}`}>{c.name}</a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* Countries Grid */}
      <section className="sidebar-card" aria-labelledby="countries-heading">
        <h3 id="countries-heading">Countries</h3>
        <div className="country-grid" role="list" aria-label="Countries with DNS servers">
          {countries.map((country) => (
            <a
              href={`#dns-${country.code.toLowerCase()}`}
              className="country-flag"
              key={country.code}
              role="listitem"
              title={`View DNS servers in ${country.name}`}
              aria-label={country.name}
            >
              {country.code}
            </a>
          ))}
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
