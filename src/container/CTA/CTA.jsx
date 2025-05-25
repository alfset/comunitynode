import React from 'react';
import './CTA.css';
import { images } from '../../constants';

const CTA = () => {
  return (
    <div className="section-padding cta">
      <div className="cta-container">
        <div className="cta-content">
          <h3 className="cta-title">
            <span className="title-highlight">Unlock</span> Earnings with Staking
          </h3>
          <p className="cta-subtitle">
            Join the future of finance! Stake your digital assets with us and earn passive income effortlessly. Our user-friendly platform is perfect for beginners and experts alike.
          </p>
          <div className="cta-buttons">
            <a href="/staking" className="cta-button primary">
              Start Staking Now
            </a>
            <a href="/learn-more" className="cta-button secondary">
              Learn More
            </a>
          </div>
        </div>
        <div className="cta-image-container">
          <img src={images.thingshappen} alt="Staking Illustration" className="cta-image" />
        </div>
      </div>
      <div className="cta-background">
        <div className="gradient-overlay"></div>
        <div className="animated-shapes">
          <div className="shape circle"></div>
          <div className="shape triangle"></div>
        </div>
      </div>
    </div>
  );
};

export default CTA;