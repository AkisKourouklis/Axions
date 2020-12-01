import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Form, Container, Button, Card, Alert } from 'react-bootstrap';
import { publicApi } from '../../../config/api';
import Main from '../../Main';

const RegisterForm = () => {
  const { handleSubmit, register } = useForm();
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleAlert = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  const onSubmit = (values) => {
    setLoading(true);
    axios
      .post(`${publicApi}/subscribers/forgot-password`, { email: values.email })
      .then(() => {
        setLoading(false);
        toggleAlert();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Main>
      <section>
        <Container
          className="bg-light pt-5 pb-5"
          style={{ minHeight: 'calc(100vh - 60px)' }}
        >
          <Card>
            <Card.Header>Βάλε το email σου</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)} id="register-form">
                <Form.Group>
                  <Form.Label>Διεύθυνση ηλεκτρονικού ταχυδρομείου</Form.Label>
                  <Form.Control name="email" ref={register()} />
                </Form.Group>
                <Button
                  disabled={loading}
                  block
                  className="mt-3"
                  form="register-form"
                  type="submit"
                >
                  {loading ? 'Περιμένετε' : 'Υποβολή'}
                </Button>
              </Form>
            </Card.Body>
            {alert ? (
              <Card.Footer>
                <Alert variant="success">
                  <Alert.Heading>Σου στείλαμε ένα email</Alert.Heading>
                  <p>Δες το και πάτα το λινκ για να αλλάξεις τον κωδικό σου!</p>
                </Alert>
              </Card.Footer>
            ) : null}
          </Card>
        </Container>
      </section>
    </Main>
  );
};

export default RegisterForm;
