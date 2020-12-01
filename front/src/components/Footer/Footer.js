import React, { useState, useEffect } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import axios from 'axios';
import { publicApi } from '../../config/api';

const Footer = () => {
  const [_courses, setCourses] = useState([]);

  const fetchCourses = () => {
    axios
      .get(`${publicApi}/courses/all`, {
        headers: { authorization: 'Bearer ' + localStorage.getItem('jwtToken') }
      })
      .then((response) => {
        setCourses(response.data.courses);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <footer className="bg-dark pt-5 pb-5">
      <Container>
        <Row>
          <Col xs="12" xl="3" className="mb-3">
            <h5 className="text-light mb-3">Ο λογαριασμός μου</h5>

            <a href="/authentication/login">
              <p className="text-light">Σύνδεση</p>
            </a>
            <a href="/authentication/register">
              <p className="text-light">Εγγραφή</p>
            </a>
          </Col>
          <Col xs="12" xl="3" className="mb-3">
            <h5 className="text-light mb-3">Επικοινωνία</h5>

            <p className="text-light">headstoneofficial@gmail.com</p>
            <a href="/contact">
              <p className="text-light">Στείλε μου μήνυμα</p>
            </a>
          </Col>
          <Col xs="12" xl="3" className="mb-3">
            <a href="/">
              <h5 className="text-light">Become the Vulture</h5>
            </a>
          </Col>
          <Col xs="12" xl="3" className="mb-3">
            <h5 className="text-light mb-3">Κοινωνικά δίκτυα</h5>

            <a href="https://www.instagram.com/george_headstone/" target="_blank">
              <p className="text-light">Instagram</p>
            </a>
            <a href="https://www.facebook.com/georgeheadstone/" target="_black">
              <p className="text-light">Facebook</p>
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
