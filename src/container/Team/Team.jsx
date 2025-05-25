import React from 'react';
import { Headings } from '../../components';
import { data } from '../../constants';
import { BsLinkedin } from 'react-icons/bs';
import './Team.css';

const Team = () => {
  const fallbackImage = 'https://via.placeholder.com/150?text=Team+Member'; // Fallback image

  return (
    <div className="section-padding team-section" id="team">
      <Headings
        title="Meet Our Visionaries"
        text="Our passionate team of blockchain pioneers drives the success of Community Node on the Planq Network."
      />
      <div className="team-container">
        {data.Team.map(({ name, position, info, linkedin, image }, index) => (
          <div className="team-card" key={index} style={{ '--index': index }}>
            <div className="team-card-header">
              <img
                src={image || fallbackImage}
                alt={name}
                className="team-image"
                loading="lazy"
                onError={(e) => (e.target.src = fallbackImage)} // Fallback on error
              />
              <div className="team-info">
                <h5 className="team-name">{name}</h5>
                <p className="team-position">{position}</p>
              </div>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="team-linkedin"
                aria-label={`Visit ${name}'s LinkedIn profile`}
              >
                <BsLinkedin />
              </a>
            </div>
            <p className="team-bio">{info}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;