import React from 'react'
import { Headings } from '../../components';
import { data } from '../../constants';
import { BsLinkedin } from 'react-icons/bs';
import './Team.css';

const Team = () => {
  return (
    <div className="section-padding">
      <Headings title="Team" text="Meet the skilled and experienced team behind our Blockchain Journey" />

      <div className="row">
        {data.Team.map(({ name, position, info, linkedin }, index) => (
          <div className="col-lg-4 col-md-6 col-12">
            <div className="card-team" key={index}>
              <div className="card-team-header">
                <p> <span>{name}</span>
                  {position}</p>
                <a href={linkedin} alt={`Linkedin + ${name}`} ><BsLinkedin /></a>
              </div>
              <p>{info}</p>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Team