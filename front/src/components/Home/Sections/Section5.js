import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';

const Testimonials = () => {
  return (
    <section className="bg-light pt-5 pb-3">
      <Container>
        <Row>
          <Col>
            <h3 className="text-center font-weight-bold mb-5">Κατασκευαστές</h3>
          </Col>
        </Row>
        <Row className="justify-content-center text-center">
          <Col xs="6" xl="2">
            <img
              className="brand-img"
              width="150px"
              src="https://content.asos-media.com/-/media/homepages/unisex/brands/256x256/dr-martens-hp-logos-256x256.jpg"
            />
          </Col>
          <Col xs="6" xl="2">
            <img
              className="brand-img"
              width="150px"
              src="https://content.asos-media.com/-/media/homepages/unisex/brands/256x256/ellesse-hp-logos-256x256.jpg"
            />
          </Col>
          <Col xs="6" xl="2">
            <img
              className="brand-img"
              width="150px"
              src="https://content.asos-media.com/-/media/homepages/unisex/brands/256x256/carhartt-hp-logos-256x256.jpg"
            />
          </Col>
          <Col xs="6" xl="2">
            <img
              className="brand-img"
              width="150px"
              src="https://content.asos-media.com/-/media/homepages/unisex/brands/256x256/nike-hp-logos-256x256.jpg"
            />
          </Col>
          <Col xs="6" xl="2">
            <img
              className="brand-img"
              width="150px"
              src="https://content.asos-media.com/-/media/homepages/unisex/brands/256x256/tommy-hilfiger-hp-logos-256x256.jpg"
            />
          </Col>
          <Col xs="6" xl="2">
            <img
              className="brand-img"
              width="150px"
              src="https://content.asos-media.com/-/media/homepages/unisex/brands/256x256/north-face.png"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;
