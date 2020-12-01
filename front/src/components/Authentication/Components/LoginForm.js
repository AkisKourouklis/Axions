import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { login } from '../../../utils/Auth';
import { AuthContext } from '../../../store/Context/Context';

const LoginForm = () => {
  const { handleSubmit, register } = useForm();
  const { setAuth } = useContext(AuthContext);

  const finishLogin = async (values) => {
    const response = await login(values);
    if (response === 'error') {
      setAuth({
        isAuthenticated: false,
        isError: true,
        id: '',
        email: '',
        name: '',
        token: ''
      });
    } else {
      setAuth({
        isAuthenticated: true,
        isError: false,
        id: response.id,
        email: response.email,
        name: response.name,
        token: response.token
      });
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('id', response.id);
      localStorage.setItem('email', response.email);
      localStorage.setItem('name', response.name);
      localStorage.setItem('token', response.token);
    }
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
