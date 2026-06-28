import React from 'react';

const ResultTable = ({ results, domain }) => {
  if (!results || results.length === 0) {
    return null;
  }

  const resolvedCount = results.filter(r => !r.loading && r.resolved).length;
  const totalChecked = results.filter(r => !r.loading).length;

  return (
    <section className="results-section" aria-labelledby="results-heading">
      <h2 id="results-heading" className="sr-only">
        DNS Propagation Results{domain ? ` for ${domain}` : ''}
      </h2>
      
      {totalChecked > 0 && (
        <div className="results-summary" role="status" aria-live="polite">
          <span className="summary-text">
            ✅ <strong>{resolvedCount}</strong> / <strong>{totalChecked}</strong> servers resolved
            {domain && <> — <strong>{domain}</strong></>}
          </span>
        </div>
      )}

      <div className="results-list" role="list" aria-label="DNS server results">
        {results.map((res, idx) => (
          <article
            className="result-row"
            key={res.id || idx}
            role="listitem"
            style={{ animationDelay: `${idx * 0.05}s` }}
            aria-label={`${res.city}, ${res.country} — ${res.loading ? 'checking' : res.resolved ? 'resolved' : 'not found'}`}
          >
            <div className="result-location">
              <div className="loc-main">
                <img
                  className="flag-img"
                  src={`https://flagcdn.com/w40/${res.countryCode.toLowerCase()}.png`}
                  alt={`${res.country} flag`}
                  width="30"
                  height="20"
                  loading="lazy"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span className="city-name">{res.city}, {res.country}</span>
              </div>
              <div className="provider-name">
                {res.provider}
                <span className="provider-info-icon" title={`DNS Provider: ${res.provider}`} aria-label={`Provider info: ${res.provider}`}>i</span>
              </div>
            </div>

            <div className="result-data">
              <div className="result-ips">
                {res.loading ? (
                  <>
                    <div className="skeleton-ip" aria-hidden="true"></div>
                    <div className="skeleton-ip" style={{ width: '90px' }} aria-hidden="true"></div>
                  </>
                ) : res.data && res.data.length > 0 ? (
                  res.data.map((ip, i) => (
                    <div className="ip-entry" key={i}>
                      <span className="ip-address" title={`Copy ${ip}`}>{ip}</span>
                      <span className="ip-link-icon" aria-hidden="true">↗</span>
                    </div>
                  ))
                ) : (
                  <span className="no-record-text">No Record</span>
                )}
              </div>

              <div className="result-status">
                {res.loading ? (
                  <span className="status-check pending" aria-label="Checking" role="img">⏳</span>
                ) : res.resolved ? (
                  <span className="status-check success" aria-label="Resolved successfully" role="img">✔</span>
                ) : (
                  <span className="status-check error" aria-label="Not resolved" role="img">✖</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ResultTable;
