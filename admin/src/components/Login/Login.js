import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Row, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/actions/auth.actions';
import { useForm } from 'react-hook-form';

// test
const Login = () => {
  const auth = useSelector((state) => state.auth?.isAuthenticated);
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();
  const [defaultEmail, setDefaultEmail] = useState();
  const [defaultPassword, setDefaultPassword] = useState();
  const [defaultCheck, setDefaultCheck] = useState(false);

  const finishLogin = (values) => {
    console.log(values);
    if (values.rememberMe && values.email !== '' && values.password !== '') {
      localStorage.email = values.email;
      localStorage.password = values.password;
      localStorage.rememberMe = values.rememberMe;
      dispatch(login(values));
    } else {
      localStorage.clear();
      dispatch(login(values));
    }
  };

  useEffect(() => {
    setDefaultEmail(localStorage.email);
    setDefaultPassword(localStorage.password);
    setDefaultCheck(localStorage.rememberMe);
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
          <Card className="p-2" style={{ width: '100%' }}>
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
                    disabled={auth}
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
                    disabled={auth}
                    type="password"
                    placeholder="Κωδικός Πρόσβασης"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    name="rememberMe"
                    ref={register()}
                    type="checkbox"
                    label="Να με θυμάσαι"
                  />
                </Form.Group>
                {auth ? (
                  <>
                    <Button href="/dashboard/overview" variant="primary" type="submit">
                      Πήγαινε στον πίνακα ελέγχου
                    </Button>
                  </>
                ) : (
                  <>
                    <Button disabled={auth} variant="primary" type="submit">
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
