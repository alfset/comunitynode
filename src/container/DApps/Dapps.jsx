import React from 'react';
import { Headings } from '../../components';
import { data } from '../../constants';
import './Dapps.css'; // Ensure you have a CSS file for styling

const Dapps = () => {
  return (
    <div className="section-padding" id="dapps">
      <Headings title="DApps" text="Explore our Decentralized Applications" />

      <div className="row">
        {data.DApps.map(({ id, name, description, imageUrl, link }, index) => (
          <div className="col-lg-4 col-md-6 col-12" key={id}>
            <a href={link} className="card-dapp-link" target="_blank" rel="noopener noreferrer">
              <div className="card-dapp">
                <img src={imageUrl} alt={name} className="card-dapp-img" />
                <div className="card-dapp-body">
                  <h5 className="card-dapp-title">{name}</h5>
                  <p className="card-dapp-text">{description}</p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dapps;
