import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="title-container">
          <h1 className="title">
            <span className="title-highlight">
              <Typewriter
                words={['Empower', 'Build', 'Innovate', 'Thrive']}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>{' '}
            Is Our Mission
          </h1>
          <p className="subtitle">
            <Typewriter
              words={[
                'Your gateway to decentralized innovation.',
                'Stake, develop, and grow on Blockchain.',
                'Join a vibrant blockchain community.',
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={30}
              delaySpeed={2000}
            />
          </p>
        </div>
        <div className="cta-container">
          <a href="#explore" className="cta-button primary">
            Start Exploring
          </a>
          <a href="#learn-more" className="cta-button secondary">
            Learn More
          </a>
        </div>
      </div>
      <div className="hero-background">
        <div className="gradient-overlay"></div>
        <div className="animated-shapes">
          <div className="shape circle shape-1"></div>
          <div className="shape triangle shape-2"></div>
          <div className="shape square shape-3"></div>
          <div className="shape hexagon shape-4"></div>
          <div className="shape pulse shape-5"></div>
        </div>
        
      </div>
    </div>
  );
};

export default Hero;