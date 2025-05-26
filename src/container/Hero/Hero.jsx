import React from 'react';
import './Hero.css';
import { Typewriter } from 'react-simple-typewriter';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="text-container">
          <div className="title-container">
            <h1 className="title">
              <span className="orange-text">Our Mission is to </span>
              <span className="title-highlight">
                <Typewriter
                  words={['Empower', 'Build', 'Innovate', 'Thrive']}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={3000}
                />
              </span>
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
            <a href="/explore" className="cta-button primary">
              Explore
            </a>
          </div>
        </div>

        <div className="fixed-image-container">
          <div className="blockchain-graphic" />

          {/* Orbiting dots around the image */}
          <div className="orbiting-dots-container" aria-hidden="true">
            <span className="orbiting-dot dot1 purple"></span>
            <span className="orbiting-dot dot2 pink"></span>
            <span className="orbiting-dot dot3 purple"></span>
            <span className="orbiting-dot dot4 pink"></span>
            <span className="orbiting-dot dot5 purple"></span>
          </div>
        </div>
      </div>

      {/* Background and gradient overlay */}
      <div className="hero-background">
        <div className="gradient-overlay"></div>
      </div>
    </section>
  );
}
