import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { publicApi } from '../../../config/api';
import Image from './Components/Image';

const Products = () => {
  const [_courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = () => {
    setLoading(true);
    axios
      .get(`${publicApi}/courses/all`, {
        headers: { authorization: 'Bearer ' + localStorage.getItem('jwtToken') }
      })
      .then((response) => {
        setCourses(response.data.courses);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <section className="pt-5 pb-5 bg-light ">
      <Container>
        <h3 className="text-center mx-auto" style={{ maxWidth: '700px' }}>
          Aν εισαι εθισμενος στην προσωπική σου κολαση, αυτο το προγραμμα ΔΕΝ ειναι για
          σενα.
        </h3>
        <p className="text-center">Τι λες? Εισαι ετοιμος να κανεις το αλμα?</p>
        {!loading ? (
          <>
            {_courses.map((data) => {
              return (
                <Card className="mt-3" key={data._id}>
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
                      Δές το τώρα
                    </Button>
                  </Card.Footer>
                </Card>
              );
            })}
          </>
        ) : (
          <Spinner />
        )}
      </Container>
    </section>
  );
};

export default Products;
