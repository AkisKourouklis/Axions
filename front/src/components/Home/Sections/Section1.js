import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../../../utils/Categories';
import { Row, Col, Container, Spinner, Button } from 'react-bootstrap';
import { settings } from '../../../utils/Slick';
import CardImage from '../../Shared/CardImage';
import Slider from 'react-slick';

const Section1 = () => {
  const [category, setCategory] = useState();

  const fetchStart = async () => {
    const response = await fetchCategories('100');
    setCategory(response);
  };

  useEffect(() => {
    fetchStart();
  }, []);

  return (
    <>
      {category ? (
        <section className="pb-4 pt-1 section1-container desktop">
          <Container>
            <Row className="mt-3 mb-2">
              <Col className="text-center">
                <h1 className="text-light font-weight-bold">
                  Όλα τα ελληνικά εσώρουχα <br /> σε μία ιστοσελίδα
                </h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <Slider {...settings}>
                  {category.map((data) => {
                    return (
                      <div className="p-2" key={data._id}>
                        <CardImage size="small" file={data} color="light" />
                      </div>
                    );
                  })}
                </Slider>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="text-center">
                <Button size="lg" className="w-25">
                  Δες τα όλα
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        <div
          style={{ height: '100vh' }}
          className="d-flex justify-content-center align-items-center bg-dark"
        >
          <Spinner className="mb-1" animation="border" size="lg" variant="light" />
        </div>
      )}
    </>
  );
};

export default Section1;
