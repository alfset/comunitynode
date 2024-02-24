import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="row">
        <div className="col-md-4 col-12">
          <ul className="info-contact">
            <li> <span>Contact us:</span></li>
            <li>Email: alfset5@gmail.com</li>
            <li>Telegram: @alfsst</li>
            <li>Address: 1234 Main St
              Moonstone City, Stardust State 12345</li>
          </ul>
        </div>

        <div className="rights">
          <p>© 2023 ComunityNode. All Rights Reserved.</p>
          <p><a href="#" alt="Privacy Policy">Privacy Policy</a></p>

        </div>
      </div>
    </footer>
  )
}

export default Footer