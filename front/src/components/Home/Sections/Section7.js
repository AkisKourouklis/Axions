import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Spinner } from 'react-bootstrap';
import { fetchCategoryName } from '../../../utils/Categories';
import CardImage from '../../Shared/CardImage';

const Section7 = () => {
  const [category, setCategory] = useState();

  const fetchStart = async () => {
    const response = await fetchCategoryName('Μποξεράκια');
    setCategory(response);
  };

  useEffect(() => {
    fetchStart();
  }, []);

  return (
    <>
      {category ? (
        <section className="section7">
          <Container className="section7-container">
            <Row>
              <Col xs="6" xl="3" className="mb-3 mb-xl-3 p-1 p-sm-3">
                <CardImage file={category} />
              </Col>
              <Col xs="6" xl="3" className="mb-3 mb-xl-3 p-1 p-sm-3">
                <CardImage file={category} />
              </Col>
              <Col xs="6" xl="3" className="mb-3 mb-xl-3 p-1 p-sm-3">
                <CardImage file={category} />
              </Col>
              <Col xs="6" xl="3" className="mb-3 mb-xl-3 p-1 p-sm-3">
                <CardImage file={category} />
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

export default Section7;
