import React from 'react';
import { Headings } from '../../components';
import { data } from '../../constants';
import './Dapps.css';

const Dapps = () => {
  return (
    <div className="section-padding dapps-section" id="dapps">
      <Headings
        title="Discover Our DApps"
        text="Dive into the futureಸ. Explore our cutting-edge decentralized applications built on the Planq Network."
      />
      <div className="dapps-container">
        {data.DApps.map(({ id, name, description, imageUrl, link }, index) => (
          <a
            href={link}
            className="dapp-card-link"
            target="_blank"
            rel="noopener noreferrer"
            key={id}
            style={{ '--index': index }}
          >
            <div className="dapp-card">
              <img src={imageUrl} alt={name} className="dapp-card-img" />
              <div className="dapp-card-body">
                <h5 className="dapp-card-title">{name}</h5>
                <p className="dapp-card-text">{description}</p>
                <span className="dapp-card-cta">
                  Explore Now <span className="cta-arrow">→</span>
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Dapps;