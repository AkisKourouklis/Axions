import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { logout } from '../../store/actions/authentication.action';

const AccountWrapper = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const _logout = () => {
    dispatch(logout());
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
