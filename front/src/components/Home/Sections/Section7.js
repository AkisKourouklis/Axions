import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { publicApi } from '../../../config/api';
import { Row, Col, Form, Button, Figure, Card, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

const Section7 = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState();
  const [courses, setCourses] = useState();
  const [alert, setAlert] = useState();

  const toggleAlert = () => {
    setAlert(!alert);
  };

  const fetchCourses = () => {
    axios
      .get(`${publicApi}/courses/all`, {
        headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
      })
      .then((response) => {
        setCourses(response.data.courses);
      });
  };

  const onSubmit = (values) => {
    setLoading(true);
    axios.post(`${publicApi}/email/newsletter`, { email: values.email }).then((res) => {
      setLoading(false);
      toggleAlert();
    });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <section className="pb-5 pt-5 bg-light">
      <Row>
        <Col xs="12" xl="6" className="mb-3 mb-xl-0">
          <Card style={{ minHeight: '360px' }}>
            <Card.Header className="text-center">
              <Figure className="m-0">
                <Figure.Image width={50} alt="171x180" src="/miscellaneous.png" />
              </Figure>
            </Card.Header>
            <Card.Body>
              <Form
                onSubmit={handleSubmit(onSubmit)}
                className="text-center"
                id="get-freelesson-form"
              >
                <Form.Group className="text-left">
                  <h5 className="mt-2">
                    Σου χτυπάει κάποια καμπανάκια? Πάρε το πρώτο μάθημα δωρεάν!
                  </h5>
                  <Form.Label className="text-dark">
                    Διεύθυνση ηλεκτρονικού ταχυδρομείου
                  </Form.Label>
                  <Form.Control
                    ref={register()}
                    name="email"
                    type="email"
                    placeholder="Email..."
                  />
                  {alert ? (
                    <Alert
                      className="mt-1"
                      variant="success"
                      onClose={toggleAlert}
                      dismissible
                    >
                      <p>Δες το email σου !</p>
                    </Alert>
                  ) : null}
                </Form.Group>
              </Form>
            </Card.Body>
            <Card.Footer>
              <Button disabled={loading} block type="submit" form="get-freelesson-form">
                {loading ? 'Περιμένετε' : 'Ξεκίνα'}
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col xs="12" xl="6">
          <Card style={{ minHeight: '360px' }}>
            <Card.Header className="text-center">
              <Figure className="m-0">
                <Figure.Image
                  width={50}
                  alt="171x180"
                  src="/Screenshot_1.png"
                  roundedCircle
                />
              </Figure>
            </Card.Header>
            <Card.Body>
              <h5>
                "H πιό σημαντικη σχεση που εχουμε ειναι με τον εαυτο μας. Αν δεν
                αγαπήσουμε τον εαυτο μας, δεν θα τον αγαπησει ποτε κανεις αλλος."
              </h5>
              <p className="mb-3">Δές τα μαθήματα</p>
              {courses?.map((data) => {
                return (
                  <Link key={data._id} href={data._id}>
                    <a>{data.name}</a>
                  </Link>
                );
              })}
            </Card.Body>
            <Card.Footer>
              <Button disabled={loading} block type="submit" form="get-freelesson-form">
                Επικοινωνία
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default Section7;
