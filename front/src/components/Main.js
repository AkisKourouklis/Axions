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
      <Container className="container-no-padding" style={{ marginTop: '60px' }}>
        <div>{children}</div>
      </Container>
      <Footer />
    </>
  );
};

export default Main;
