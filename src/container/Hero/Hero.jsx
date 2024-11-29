import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="title-container">
          <h1 className="title fade-in">Welcome to Community Node</h1>
          <p className="subtitle fade-in">Your gateway to decentralized technologies</p>
        </div>

        <div className="cta-container fade-in">
          <a href="#" className="cta-button">Get Started</a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
