// DNS Provider with simulated global lookups using Google DoH
// Each location represents a real DNS server in that geography

const DNS_SERVERS = [
  { id: 'sf-opendns',     city: 'San Francisco CA',  country: 'United States', countryCode: 'US', provider: 'OpenDNS' },
  { id: 'mv-google',      city: 'Mountain View CA',  country: 'United States', countryCode: 'US', provider: 'Google' },
  { id: 'bk-quad9',       city: 'Berkeley',           country: 'US',            countryCode: 'US', provider: 'Quad9' },
  { id: 'us-centurylink', city: 'United States',      country: 'United States', countryCode: 'US', provider: 'CenturyLink' },
  { id: 'ash-neustar',    city: 'Ashburn',            country: 'United States', countryCode: 'US', provider: 'NeuStar' },
  { id: 'sf-quad9',       city: 'San Francisco',      country: 'US',            countryCode: 'US', provider: 'Quad9' },
  { id: 'alp-zcorum',     city: 'Alpharetta',         country: 'United States', countryCode: 'US', provider: 'ZCORUM' },
  { id: 'bn-fortinet',    city: 'Burnaby',            country: 'Canada',        countryCode: 'CA', provider: 'Fortinet Inc' },
  { id: 'tor-cira',       city: 'Toronto',            country: 'Canada',        countryCode: 'CA', provider: 'CIRA' },
  { id: 'lon-cloudflare', city: 'London',             country: 'UK',            countryCode: 'GB', provider: 'Cloudflare' },
  { id: 'fra-de-cix',     city: 'Frankfurt',          country: 'Germany',       countryCode: 'DE', provider: 'DE-CIX' },
  { id: 'ams-ripe',       city: 'Amsterdam',          country: 'Netherlands',   countryCode: 'NL', provider: 'RIPE NCC' },
  { id: 'par-orange',     city: 'Paris',              country: 'France',        countryCode: 'FR', provider: 'Orange' },
  { id: 'tok-iij',        city: 'Tokyo',              country: 'Japan',         countryCode: 'JP', provider: 'IIJ' },
  { id: 'sg-singtel',     city: 'Singapore',          country: 'Singapore',     countryCode: 'SG', provider: 'SingTel' },
  { id: 'syd-telstra',    city: 'Sydney',             country: 'Australia',     countryCode: 'AU', provider: 'Telstra' },
  { id: 'mum-tata',       city: 'Mumbai',             country: 'India',         countryCode: 'IN', provider: 'Tata Comms' },
  { id: 'sp-brasil',      city: 'São Paulo',          country: 'Brazil',        countryCode: 'BR', provider: 'Registro.br' },
  { id: 'jhb-liquid',     city: 'Johannesburg',       country: 'South Africa',  countryCode: 'ZA', provider: 'Liquid Telecom' },
  { id: 'dub-etisalat',   city: 'Dubai',              country: 'UAE',           countryCode: 'AE', provider: 'Etisalat' },
  { id: 'yek-rostelecom', city: 'Yekaterinburg',      country: 'Russia',        countryCode: 'RU', provider: 'Rostelecom' },
  { id: 'sel-kt',         city: 'Seoul',              country: 'South Korea',   countryCode: 'KR', provider: 'KT Corp' },
  { id: 'stk-telia',      city: 'Stockholm',          country: 'Sweden',        countryCode: 'SE', provider: 'Telia' },
  { id: 'war-tpnet',      city: 'Warsaw',             country: 'Poland',        countryCode: 'PL', provider: 'TP Net' },
];

const RECORD_TYPE_MAP = {
  'A': 1, 'AAAA': 28, 'CNAME': 5, 'MX': 15, 'NS': 2,
  'PTR': 12, 'SRV': 33, 'SOA': 6, 'TXT': 16, 'CAA': 257,
  'DS': 43, 'DNSKEY': 48,
};

export const getAllServers = () => DNS_SERVERS;

export const fetchDNSForServer = async (domain, type, server) => {
  const typeInt = RECORD_TYPE_MAP[type.toUpperCase()] || 1;
  const endpoint = `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${typeInt}`;

  try {
    // Simulate propagation delay variance across global network
    const delay = Math.random() * 1200 + 300;
    await new Promise(r => setTimeout(r, delay));

    const response = await fetch(endpoint, {
      headers: { 'Accept': 'application/dns-json' }
    });

    if (!response.ok) throw new Error('Network error');
    const data = await response.json();

    let resolvedData = [];
    let resolved = false;

    if (data.Answer && data.Answer.length > 0) {
      resolvedData = data.Answer.map(ans => ans.data);
      resolved = true;
    }

    return { ...server, resolved, data: resolvedData, loading: false };
  } catch {
    return { ...server, resolved: false, data: [], loading: false };
  }
};
