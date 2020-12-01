import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { fetchCourses } from '../../../utils/Courses';
import Image from './Components/Image';

const Products = () => {
  const [courses, setCourses] = useState([]);

  const fetchStart = async () => {
    const _courses = await fetchCourses('');
    setCourses(_courses);
  };

  useEffect(() => {
    fetchStart();
  }, []);

  return (
    <section className="pt-5 pb-5">
      <Container>
        <h3 className="text-center mx-auto" style={{ maxWidth: '700px' }}>
          Aν εισαι εθισμενος στην προσωπική σου κολαση, αυτο το προγραμμα ΔΕΝ ειναι για
          σενα.
        </h3>
        <p className="text-center">Τι λες? Εισαι ετοιμος να κανεις το αλμα?</p>
        {courses?.map((data) => {
          return (
            <Card className="mt-5 shadow" key={data._id}>
              <Card.Header>
                <h5>{data.name}</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col xs="12" xl="6">
                    <Row>
                      <Col className="text-center">
                        <Image imagekey={data.image} />
                      </Col>
                    </Row>
                    <Row>
                      <Col>{data.description}</Col>
                    </Row>
                  </Col>
                  <Col xs="12" xl="6">
                    {data.options.map((doc) => {
                      return (
                        <Card key={doc._id} className="mb-1">
                          <Card.Body>
                            <p>{doc.name}</p>
                          </Card.Body>
                        </Card>
                      );
                    })}
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <Button block size="lg" href={`/product?id=${data._id}`}>
                  Δες το τώρα
                </Button>
              </Card.Footer>
            </Card>
          );
        })}
      </Container>
    </section>
  );
};

export default Products;
