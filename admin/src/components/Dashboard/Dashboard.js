import React, { useContext } from 'react';
import { Container, Navbar, Nav, NavDropdown, Spinner, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../../store/Context/Context';

const Dashboard = ({ children }) => {
  const { auth } = useContext(AuthContext);

  return (
    <>
      {auth.isAuthenticated ? (
        <>
          <Container className="p-0">
            <Navbar bg="dark" variant="dark" expand="xl">
              <Navbar.Brand href="/dashboard/overview">
                <img alt="img" src="/lOGO_200PX.svg" width="170px" />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <NavDropdown title="Αγορές" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/dashboard/courses">
                      Σειρές Μαθημάτων
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/dashboard/products">
                      Προιόντα
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/dashboard/sales">Πωλήσεις</NavDropdown.Item>
                    <NavDropdown.Item href="/dashboard/promocodes">
                      Κωδικοί εκπτώσεων
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/dashboard/categories">
                      Κατηγορίες
                    </NavDropdown.Item>

                    <NavDropdown.Item href="/dashboard/filters">Φίλτρα</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/dashboard/customers">
                      Πελάτες
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="/dashboard/chat/join">Συνομιλία</Nav.Link>
                  <Nav.Link href="/dashboard/newsletter">Eνημερωτικό δελτίο</Nav.Link>
                  <Nav.Link href="/dashboard/design">Σχεδιασμός</Nav.Link>
                  <Nav.Link href="/dashboard/settings">Ρυθμίσεις</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Container>
          <Container style={{ background: '#fff', minHeight: '100vh' }} className="pt-2">
            <div>{children}</div>
          </Container>
          <Container className="desktop">
            <Row className="bg-dark p-5">
              <Col xs="12" md="4">
                <span>
                  <img alt="img" src="/fav-white.svg" width="50px" />
                </span>
                <span className="text-light" style={{ fontSize: '21px' }}>
                  Axions
                </span>
                <p className="text-light mt-3">
                  Axions is an online platform to host your online course or your
                  e-commerce website. Everything you need now in one platform
                </p>
              </Col>
              <Col xs="12" md="4">
                <h3 className="text-light">Contact</h3>
                <p className="mt-4 text-light">kourouklis8@gmail.com</p>
              </Col>
              <Col xs="12" md="4">
                <h3 className="text-light">Created with Axions</h3>
                <p className="mt-4 text-light">
                  <a href="https://www.becomethevulture.com">www.becomethevulture.com</a>
                </p>
                <p className=" text-light">
                  <a href="https://www.sovrakofanela.gr">www.sovrakofanela.gr</a>
                </p>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: '100vh' }}
        >
          <Spinner className="mb-1" animation="border" size="lg" />
        </div>
      )}
    </>
  );
};

export default Dashboard;
