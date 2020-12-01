import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Form, Container, Button, Card } from 'react-bootstrap';
import { publicApi } from '../../../config/api';
import Main from '../../Main';

const RegisterForm = () => {
  const { handleSubmit, register } = useForm();
  const router = useRouter();

  const onSubmit = (values) => {
    const { id } = router.query;
    axios
      .post(`${publicApi}/subscribers/reset-password/${id}`, {
        password: values?.password
      })
      .then(() => {
        router.push('/authentication/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Main>
      <Container
        className="bg-light pt-5 pb-5"
        style={{ minHeight: 'calc(100vh - 60px)' }}
      >
        <section>
          <Card>
            <Card.Header>Βάλε τον νέο σου κωδικό</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)} id="register-form">
                <Form.Group>
                  <Form.Label>Κωδικός πρόσβασης</Form.Label>
                  <Form.Control ref={register()} name="password" type="password" />
                </Form.Group>
                <Button block className="mt-3" form="register-form" type="submit">
                  Υποβολή
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </section>
      </Container>
    </Main>
  );
};

export default RegisterForm;
