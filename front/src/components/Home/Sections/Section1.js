import React from 'react';
import ReactPlayer from 'react-player';
import { Row, Col } from 'react-bootstrap';

const Intro = () => {
  return (
    <section className="intro-container pt-5 pb-5">
      <Row className="justify-content-center">
        <h2 className="headline">
          <img alt="img" src="/logo.png" className="logo-intro" />
        </h2>
      </Row>
      <Row className="justify-content-center">
        <Col className="text-center">
          <h3 className="subhead">Το online course που</h3>
          <h3 className="subhead">Θα σου αλλάξει τα δεδομένα</h3>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center mt-5">
        <Col xs="12">
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <ReactPlayer
              style={{ borderRadius: '4px' }}
              url="https://youtu.be/YJn_2lT6J7E"
              controls
            />
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default Intro;
