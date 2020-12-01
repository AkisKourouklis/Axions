import React from 'react';
import { Container } from 'react-bootstrap';
import AppBar from './Navbar/AppBar';
import Footer from './Footer/Footer';
import Pixel from '../facebook/Pixel';

const Main = ({ children }) => {
  return (
    <>
      <Pixel />
      <div className="nav-container">
        <AppBar />
      </div>
      <Container fluid className="container-no-padding p-0">
        <div>{children}</div>
      </Container>
      <Footer />
    </>
  );
};

export default Main;
