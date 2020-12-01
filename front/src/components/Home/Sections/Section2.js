import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Spinner } from 'react-bootstrap';
import { fetchCategoryName } from '../../../utils/Categories';
import CardImage from '../../Shared/CardImage';

const Ticks = () => {
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
        <section className="section2">
          <Container className="pl-sm-3 pr-sm-3 p-0">
            <Row>
              <Col className="pl-sm-3 pr-sm-3 p-0">
                <CardImage size="large" file={category} />
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

export default Ticks;
