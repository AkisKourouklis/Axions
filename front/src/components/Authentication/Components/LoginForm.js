import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { login } from '../../../store/actions/authentication.action';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();

  const finishLogin = (values) => {
    dispatch(login(values));
  };

  return (
    <>
      <Form onSubmit={handleSubmit(finishLogin)}>
        <Form.Group>
          <Form.Label>Διεύθυνση ηλεκτρονικού ταχυδρομείου</Form.Label>
          <Form.Control name="email" ref={register()} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Κωδικός πρόσβασης</Form.Label>
          <Form.Control name="password" ref={register()} type="password" />
        </Form.Group>

        <Button className="mt-3" block type="submit">
          Σύνδεση
        </Button>
        <a href="/password/email" className="hover">
          Ξέχασες τον κωδικό σου;
        </a>
      </Form>
    </>
  );
};

export default LoginForm;
