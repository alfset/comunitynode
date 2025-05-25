import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { data } from '../../constants';
import { Headings } from '../../components';
import { FiPlus, FiMinus } from 'react-icons/fi';
import './Process.css';

const Process = () => {
  if (!data.WorkingProcess || !Array.isArray(data.WorkingProcess)) {
    return (
      <div className="section-padding process-section" id="process">
        <Headings
          title="Our Process"
          text="Empowering the community and developers with seamless support for the Planq Network."
        />
        <p className="error-message">No process data available.</p>
      </div>
    );
  }

  return (
    <div className="section-padding process-section" id="process">
      <Headings
        title="Our Process"
        text="Empowering the community and developers with seamless support for the Planq Network."
      />
      <div className="process-container">
        <Accordion>
          {data.WorkingProcess.map((item, index) => (
            <Accordion.Item
              eventKey={index.toString()}
              key={index}
              className="process-item"
              style={{ '--index': index }}
            >
              <Accordion.Header>
                <div className="process-header">
                  <span className="process-number">{index + 1}</span>
                  <span className="process-title">{item.title}</span>
                </div>
                <span className="accordion-icon">
                  <FiPlus className="icon-plus" />
                  <FiMinus className="icon-minus" />
                </span>
              </Accordion.Header>
              <Accordion.Body>
                <p className="process-description">{item.description}</p>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Process;