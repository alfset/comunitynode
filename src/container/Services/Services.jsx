import React, { useEffect, useRef } from 'react';
import { Headings } from '../../components';
import { data } from '../../constants';
import './Services.css';

const Services = () => {
  const servicesRef = useRef(null);
  const introRef = useRef(null);
  const lastCardRef = useRef(null);

  useEffect(() => {
    const servicesSection = servicesRef.current;
    if (!servicesSection) return;

    const observerOptions = {
      root: servicesSection,
      threshold: 0.5, // Trigger when 50% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === introRef.current) {
            const heroSection = document.getElementById('hero');
            if (heroSection) {
              heroSection.scrollIntoView({ behavior: 'smooth' });
            }
          } else if (entry.target === lastCardRef.current) {
            const nextSection = document.getElementById('casestudies'); // Updated to match likely next section
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      });
    }, observerOptions);

    if (introRef.current) observer.observe(introRef.current);
    if (lastCardRef.current) observer.observe(lastCardRef.current);

    return () => {
      if (introRef.current) observer.unobserve(introRef.current);
      if (lastCardRef.current) observer.unobserve(lastCardRef.current);
    };
  }, []);

  return (
    <div id="services" className="services-section" ref={servicesRef}>
      <div className="vertical-services-container">
        <div className="intro-section" ref={introRef}>
          <Headings
            title="Our Services"
            text="Your trusted partner in the Proof-of-Stake ecosystem, empowering delegators and developers with secure, high-performance solutions."
          />
        </div>

        {data.ServicesData.map(({ titleone, titletwo, itemclass, imgURL, description }, index) => (
          <div
            className={`vertical-service-card ${itemclass}`}
            key={index}
            ref={index === data.ServicesData.length - 1 ? lastCardRef : null}
          >
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