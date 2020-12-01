import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { register as authregister } from '../../../utils/Auth';

const RegisterForm = () => {
  const { handleSubmit, register } = useForm();
  const router = useRouter();

  const finishRegister = (values) => {
    authregister(values, router);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(finishRegister)} id="register-form">
        <Form.Group>
          <Form.Label>Όνομα</Form.Label>
          <Form.Control ref={register()} name="name" type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Διεύθυνση ηλεκτρονικού ταχυδρομείου</Form.Label>
          <Form.Control ref={register()} name="email" type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Τηλέφωνο</Form.Label>
          <Form.Control ref={register()} name="phone" type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Κωδικό πρόσβασης</Form.Label>
          <Form.Control ref={register()} name="password" type="password" />
        </Form.Group>
        <Button block className="mt-3" form="register-form" type="submit">
          Εγγραφή
        </Button>
      </Form>
    </>
  );
};

export default RegisterForm;
