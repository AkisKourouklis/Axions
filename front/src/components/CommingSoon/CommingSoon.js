import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Navbar,
  Nav,
  Row,
  Col,
  Form,
  Button,
  Popover,
  OverlayTrigger
} from 'react-bootstrap';
import { fetchLogo, fetchConfig } from '../../utils/Config';
import { AiOutlineInstagram, AiOutlineFacebook } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { postNewsletter } from '../../utils/Newsletter';
import { login } from '../../utils/Auth';
import { AuthContext } from '../../store/Context/Context';

const Contact = () => {
  const [logo, setLogo] = useState();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adminUrl, setAdminUrl] = useState();
  const [frontUrl, setFrontUrl] = useState();
  const { register, handleSubmit } = useForm();
  const { auth, setAuth } = useContext(AuthContext);

  const fetchStart = async () => {
    const _config = await fetchConfig();
    const _logo = await fetchLogo(_config.logo);

    setAdminUrl(_config?.adminUrl);
    setFrontUrl(_config?.frontUrl);
    setLogo(_logo);
  };

  const submit = async (values) => {
    setLoading(true);
    const _response = await postNewsletter(values.email);
    if (_response === 'success') {
      setSuccess(true);
      setLoading(false);
    }
  };

  const submitLogin = async (values) => {
    console.log(values);
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

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      isError: false,
      id: '',
      email: '',
      name: '',
      token: ''
    });
    localStorage.clear();
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Είσαι διαχειριστής;</Popover.Title>
      <Popover.Content>
        <Form onSubmit={handleSubmit(submitLogin)} id="admin-login">
          <Form.Group>
            <Form.Control
              name="email"
              ref={register()}
              type="text"
              placeholder="Email"
              className=""
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              ref={register()}
              type="password"
              placeholder="Password"
              className=""
              name="password"
            />
          </Form.Group>
          <Button type="submit" form="admin-login" block>
            Σύνδεση
          </Button>
        </Form>
      </Popover.Content>
    </Popover>
  );

  useEffect(() => {
    fetchStart();
  }, []);

  return (
    <div
      className="commingsoon-container"
      style={{ background: 'url(/Wavey-Fingerprint.svg)', backgroundSize: 'cover' }}
    >
      <Navbar variant="dark" className="comming-navbar" expand="lg">
        <Navbar.Brand>
          <img src={logo} className="nav-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {auth.isAuthenticated ? (
              <>
                <Nav.Link
                  href={
                    process.env.NODE_ENV === 'development'
                      ? 'http://localhost:3001'
                      : frontUrl
                  }
                >
                  <h5 className="font-weight-bold">Ιστοσελίδα</h5>
                </Nav.Link>
                <Nav.Link
                  href={
                    process.env.NODE_ENV === 'development'
                      ? 'http://localhost:3002'
                      : adminUrl
                  }
                >
                  <h5 className="font-weight-bold">Διαχειριστικό</h5>
                </Nav.Link>
                <Nav.Link onClick={logout}>
                  <h5 className="font-weight-bold">Αποσύνδεση</h5>
                </Nav.Link>
              </>
            ) : (
              <OverlayTrigger trigger="click" placement="bottom-end" overlay={popover}>
                <Nav.Link>
                  <h5 className="font-weight-bold">Σύνδεση</h5>
                </Nav.Link>
              </OverlayTrigger>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container className="mt-0 mt-sm-5" style={{ maxWidth: '1440px' }}>
        <Row>
          <Col xs="12" lg="8">
            <span className="text-primary font-weight-bold normal-font comming-text1">
              Όλα είναι έτοιμα να
            </span>
            <p className="text-light normal-font font-weight-light comming-text2">
              ΑΛΛΑΞΟΥΝ
            </p>
            <Form className="w-100 mt-5" onSubmit={handleSubmit(submit)}>
              <Row>
                <Col xs="12" md="8">
                  <Form.Control
                    ref={register()}
                    name="email"
                    type="text"
                    placeholder="Get 10% Discount with your email"
                    size="lg"
                    className="w-100 "
                  />
                  {success ? <p className="text-light mt-2">Δες το εμαιλ σου !</p> : null}
                </Col>
                <Col xs="12" md="4">
                  <Button
                    disabled={loading}
                    type="submit"
                    variant="secondary"
                    className="mt-sm-0 mt-1"
                    block
                    size="lg"
                  >
                    {loading ? 'Περιμένετε' : 'Λάβε μέρος'}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row className="comming-subtitle-row justify-content-between">
          <Col xs="12" lg="6">
            <p className="text-gray">
              Όλα τα ελληνικά εσώρουχα σε μία ιστοσελίδα. Βοήθησε τις ελληνικές βιοτεχνίες
              να μεγαλώσουν σήμερα. Γίνε μέρος του κλειστού κύκλου και πάρε 10% έκπτωση
              στην έναρξη στην ιστοσελίδας μας
            </p>
          </Col>
          <Col xs="12" lg="6" className="social-col">
            <a href="https://www.instagram.com/sovrakofanela/" target="_blank">
              <AiOutlineInstagram className="mr-5" fontSize={30} />
            </a>
            <a
              href="https://www.facebook.com/Sovrakofanela-Underware-109454960850670"
              target="_blank"
            >
              <AiOutlineFacebook fontSize={30} />
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
