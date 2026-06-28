import React from 'react';

const Footer = () => {
  const columns = [
    {
      title: 'DNS Tools',
      links: [
        { text: 'DNS Lookup', href: '#dns-lookup' },
        { text: 'WHOIS Lookup', href: '#whois' },
        { text: 'Reverse DNS', href: '#reverse-dns' },
        { text: 'DNS Propagation', href: '#dns-propagation' },
        { text: 'DNS Record Check', href: '#dns-record' },
        { text: 'DNSSEC Analyzer', href: '#dnssec' },
      ],
    },
    {
      title: 'IP Tools',
      links: [
        { text: 'What is My IP', href: '#my-ip' },
        { text: 'IP Location', href: '#ip-location' },
        { text: 'IP WHOIS', href: '#ip-whois' },
        { text: 'Ping Tool', href: '#ping' },
        { text: 'Traceroute', href: '#traceroute' },
        { text: 'My Public DNS', href: '#public-dns' },
      ],
    },
    {
      title: 'Network Tools',
      links: [
        { text: 'Port Checker', href: '#port-checker' },
        { text: 'SSL Checker', href: '#ssl-checker' },
        { text: 'HTTP Status', href: '#http-status' },
        { text: 'Open Port Scanner', href: '#port-scanner' },
        { text: 'HTTP Headers', href: '#http-headers' },
        { text: 'Website Speed Test', href: '#speed-test' },
      ],
    },
    {
      title: 'Developer Tools',
      links: [
        { text: 'JSON Formatter', href: '#json-formatter' },
        { text: 'URL Encoder / Decoder', href: '#url-encoder' },
        { text: 'Base64 Encoder', href: '#base64' },
        { text: 'HTML Minifier', href: '#html-minifier' },
        { text: 'CSS Beautifier', href: '#css-beautifier' },
        { text: 'Code Diff', href: '#code-diff' },
      ],
    },
    {
      title: 'Security Tools',
      links: [
        { text: 'Email Blacklist Check', href: '#email-blacklist' },
        { text: 'Domain Blacklist', href: '#domain-blacklist' },
        { text: 'SPF Record Check', href: '#spf' },
        { text: 'DKIM Check', href: '#dkim' },
        { text: 'DMARC Check', href: '#dmarc' },
        { text: 'MX Lookup', href: '#mx-lookup' },
      ],
    },
    {
      title: 'Productivity',
      links: [
        { text: 'QR Code Generator', href: '#qr-code' },
        { text: 'Password Generator', href: '#password' },
        { text: 'UUID Generator', href: '#uuid' },
        { text: 'Hash Calculator', href: '#hash' },
        { text: 'Random Number', href: '#random' },
        { text: 'Lorem Ipsum', href: '#lorem-ipsum' },
      ],
    },
  ];

  return (
    <footer className="site-footer" role="contentinfo">
      <nav className="footer-grid" aria-label="Footer tools navigation">
        {columns.map(col => (
          <div className="footer-col" key={col.title}>
            <h4>{col.title}</h4>
            <ul>
              {col.links.map(link => (
                <li key={link.text}><a href={link.href}>{link.text}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} DNS Checker — All rights reserved.</p>
        <nav className="footer-bottom-links" aria-label="Legal links">
          <a href="#contact">Contact Us</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#blogs">Blogs</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
