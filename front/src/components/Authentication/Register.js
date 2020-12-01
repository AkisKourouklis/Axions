import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Card } from 'react-bootstrap';
import Main from '../Main';
import RegisterForm from './Components/RegisterForm';

const Register = () => {
  const auth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Main>
      <section>
        <Container
          className="bg-light pt-5 pb-5"
          style={{ minHeight: 'calc(100vh - 60px)' }}
        >
          {auth ? (
            <Card>
              <Card.Header>
                <h5>Εγγραφή</h5>
              </Card.Header>
              <Card.Body>Είστε συνδεδεμένος</Card.Body>
            </Card>
          ) : (
            <Card>
              <Card.Header>
                <h5>Εγγραφή</h5>
              </Card.Header>
              <Card.Body>
                <RegisterForm />
              </Card.Body>
            </Card>
          )}
        </Container>
      </section>
    </Main>
  );
};

export default Register;
