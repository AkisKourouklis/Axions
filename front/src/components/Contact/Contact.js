import React, { useState } from 'react';
import Main from '../Main';
import { Form, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { publicApi } from '../../config/api';

const Contact = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  const toggleAlert = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  const onSubmit = (values) => {
    const { email, message, name } = values;
    setLoading(true);
    axios
      .post(
        `${publicApi}/email/contact`,
        { email, name, message },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then(() => {
        setLoading(false);
        toggleAlert();
      });
  };

  return (
    <Main>
      <section className="bg-light pt-5 pb-5">
        <Row className="mb-3">
          <Col>
            <h3>Στείλε μου μήνυμα</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Header>Επικοινωνία</Card.Header>
              <Card.Body>
                <Form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group>
                    <Form.Label>Διεύθυνση ηλεκτρονικού ταχυδρομείου</Form.Label>
                    <Form.Control name="email" placeholder="Email..." ref={register()} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Όνομα</Form.Label>
                    <Form.Control name="name" placeholder="Όνομα..." ref={register()} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Μήνυμα</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      placeholder="Το μήνυμα σου..."
                      ref={register()}
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
              <Card.Footer>
                {alert ? <Alert variant="success">Επιτυχία αποστολής</Alert> : null}
                <Button type="submit" form="contact-form" disabled={loading}>
                  {loading ? 'Περιμένετε' : 'Αποστολή'}
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <p>
              Πήγαινε πίσω στην αρχική για να δείς όλα τα μαθήματα.{' '}
              <a href="/">Κάνε κλίκ εδώ</a>
            </p>
            <b>
              Δες το instagram μου{' '}
              <a href="https://www.instagram.com/george_headstone/?hl=el" target="_blank">
                εδώ
              </a>{' '}
            </b>
          </Col>
        </Row>
      </section>
    </Main>
  );
};

export default Contact;
