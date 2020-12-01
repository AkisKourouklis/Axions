import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

const Dashboard = ({ children }) => {
  return (
    <>
      <Container className="p-0">
        <Navbar bg="dark" variant="dark" expand="xl">
          <Navbar.Brand href="/dashboard/overview">AxionsBeta Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Αγορές" id="basic-nav-dropdown">
                <NavDropdown.Item href="/dashboard/sales">Πωλήσεις</NavDropdown.Item>
                <NavDropdown.Item href="/dashboard/promocodes">
                  Κωδικοί εκπτώσεων
                </NavDropdown.Item>
                <NavDropdown.Item href="/dashboard/customers">Πελάτες</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/dashboard/chat/join">Συνομιλία</Nav.Link>
              <Nav.Link href="/dashboard/courses">Σειρές Μαθημάτων</Nav.Link>
              <Nav.Link href="/dashboard/newsletter">Eνημερωτικό δελτίο</Nav.Link>
              <Nav.Link href="/dashboard/settings">Ρυθμίσεις</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
      <Container style={{ background: '#fff', minHeight: '100vh' }} className="pt-2">
        <div>{children}</div>
      </Container>
    </>
  );
};

export default Dashboard;
