import React, { useContext } from 'react';
import { Container, Card } from 'react-bootstrap';
import Main from '../Main';
import RegisterForm from './Components/RegisterForm';
import { AuthContext } from '../../store/Context/Context';

const Register = () => {
  const auth = useContext(AuthContext);

  return (
    <Main>
      <section>
        <Container
          className="bg-light pt-5 pb-5"
          style={{ minHeight: 'calc(100vh - 60px)' }}
        >
          {auth.isAuthenticated ? (
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
