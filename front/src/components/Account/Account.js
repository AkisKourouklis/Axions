import React, { useContext } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { AuthContext } from '../../store/Context/Context';

const AccountWrapper = ({ children }) => {
  const router = useRouter();
  const { setAuth } = useContext(AuthContext);

  const _logout = () => {
    setAuth({
      isAuthenticated: false,
      isError: false,
      id: '',
      email: '',
      name: '',
      token: ''
    });
    localStorage.clear();
    router.push('/');
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="xl">
        <Container>
          <Navbar.Brand href="/">
            <img style={{ width: '170px' }} src="/logo.png" alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/account/mycourses">Μαθήματα</Nav.Link>
              <Nav.Link onClick={_logout}>Αποσύνδεση</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {children}
    </>
  );
};

export default AccountWrapper;
