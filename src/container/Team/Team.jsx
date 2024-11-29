import React from 'react';
import { Headings } from '../../components';
import { data } from '../../constants';
import { BsLinkedin } from 'react-icons/bs';
import './Team.css';

const Team = () => {
  return (
    <div className="section-padding">
      <Headings title="Team" text="Our skilled and experienced team behind our Blockchain Journey" />
      
      <div className="row">
        {data.Team.map(({ name, position, info, linkedin, image }, index) => (
          <div className="col-lg-4 col-md-6 col-12" key={index}>
            <div className="card-team">
              <div className="card-team-header">
                <img src={image} alt={name} className="team-image" />
                <div>
                  <p>
                    <span>{name}</span>
                    {position}
                  </p>
                </div>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn ${name}`}>
                  <BsLinkedin />
                </a>
              </div>
              <p>{info}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
