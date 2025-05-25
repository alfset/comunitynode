import React from 'react';
import { Headings } from '../../components';
import { data } from '../../constants';
import './Services.css';

const Services = () => {
  return (
    <div id="services" className="services-section">
      <div className="vertical-services-container">
        <div className="intro-section">
          <Headings
            title="Our Services"
            text="Your trusted partner in the Proof-of-Stake ecosystem, empowering delegators and developers with secure, high-performance solutions."
          />
        </div>

        {data.ServicesData.map(({ titleone, titletwo, itemclass, imgURL, description }, index) => (
          <div className={`vertical-service-card ${itemclass}`} key={index}>
            <div className="card-content">
              <div className="full-image-container">
                <img src={imgURL} alt={`${titleone} ${titletwo}`} className="rounded-service-image" />
              </div>
              <div className="service-card-text">
                <h3 className="title-one">{titleone}</h3>
                <h4 className="title-two">{titletwo}</h4>
                <p>{description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
