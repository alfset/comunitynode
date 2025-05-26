import React from 'react';
import { Headings, IconScroll } from '../../components';
import { data } from '../../constants';
import { FiArrowUpRight } from 'react-icons/fi';
import './CaseStudies.css';

const CaseStudies = () => {
  return (
    <div className="section-padding case-studies-section" id="casestudies">
      <Headings
        title="Our Success Stories"
        text="Powering the Planq Network for over a year, our validator stands out with a passionate team of blockchain enthusiasts and community node runners from Surabaya. We prioritize security, community engagement, and top-tier performance."
      />
      <div className="case-studies-container">
        {data.CaseStudies.map(({ text, link }, index) => (
          <div key={index} className="case-studies-item">
            <p className="case-studies-text">{text}</p>
            {link && (
              <a href={link} className="case-studies-link" target="_blank" rel="noopener noreferrer">
                Explore More <FiArrowUpRight className="link-icon" />
              </a>
            )}
          </div>
        ))}
      </div>
      <IconScroll />
    </div>
  );
};

export default CaseStudies;