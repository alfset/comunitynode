import React from 'react';
import { Headings } from '../../components';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="section-padding footer-section" id="footer">
      <Headings
        title="Connect With Us"
        text="Reach out to join our community or learn more about our services on the Planq Network."
      />
      <div className="footer-container">
        <div className="contact-info">
          <ul className="info-contact">
            <li><span>Contact us:</span></li>
            <li>Email: <a href="mailto:alf@comunitynode.my.id">alf@comunitynode.my.id</a></li>
            <li>Telegram: <a href="https://t.me/alfsst" target="_blank" rel="noopener noreferrer">@alfsst</a></li>
            <li>Address: Ngaglik Kuburan 19, Surabaya, East Java, Indonesia</li>
          </ul>
        </div>
        <div className="rights">
          <p>© 2020 ComunityNode. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;