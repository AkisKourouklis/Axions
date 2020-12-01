import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Form, Row, Button, ButtonGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../store/Context/Context';
import { login as authlogin } from '../../utitls/Auth';
import { useRouter } from 'next/router';

// test
const Login = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { handleSubmit, register } = useForm();
  const [defaultEmail, setDefaultEmail] = useState();
  const router = useRouter();

  const finishLogin = async (values) => {
    const response = await authlogin(values);
    if (response !== 'error') {
      console.log(response);
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('id', response.id);
      localStorage.setItem('email', response.email);
      localStorage.setItem('name', response.name);
      localStorage.setItem('jwtToken', response.token);
      setAuth({
        isAuthenticated: Boolean(localStorage.getItem('isAuthenticated')),
        isError: false,
        id: localStorage.getItem('id'),
        email: localStorage.getItem('email'),
        name: localStorage.getItem('name'),
        token: localStorage.getItem('token')
      });
    }
  };

  const logout = () => {
    localStorage.clear();
    router.reload();
  };

  useEffect(() => {
    setDefaultEmail(localStorage.email);
  }, []);
  return (
    <>
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <Row>
          <Card className="p-2 shadow" style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>Σύνδεση</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Καλός ήρθες στο Axions Dashboard
              </Card.Subtitle>
              <Form onSubmit={handleSubmit(finishLogin)}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Διεύθυνση ηλεκτρονικού ταχυδρομίου</Form.Label>
                  <Form.Control
                    name="email"
                    ref={register()}
                    type="text"
                    defaultValue={defaultEmail}
                    disabled={auth.isAuthenticated}
                    placeholder="Διεύθυνση email"
                  />
                  <Form.Text className="text-muted">
                    Δεν θα μοιραστούμε τα στοιχεία σου με κανέναν
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Κωδικός Πρόσβασης</Form.Label>
                  <Form.Control
                    name="password"
                    ref={register()}
                    disabled={auth.isAuthenticated}
                    type="password"
                    placeholder="Κωδικός Πρόσβασης"
                  />
                </Form.Group>
                {auth.isAuthenticated ? (
                  <>
                    <Button
                      className="mr-1"
                      href="/dashboard/overview"
                      variant="info"
                      type="submit"
                    >
                      Πήγαινε στον πίνακα ελέγχου
                    </Button>
                    <Button onClick={logout}>Άλλαξε λογαριασμό</Button>
                  </>
                ) : (
                  <>
                    <Button variant="primary" type="submit">
                      Σύνδεση
                    </Button>
                  </>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
};

export default Login;
