import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Form, Button } from 'react-bootstrap';
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
    <footer>
      <Container>
        <Row className="mt-5 mb-3 border-top pt-3">
          <Col className="text-center">
            <a href="/">
              <img alt="instagram" src="/instagram.svg" width="30px" className="mr-2" />
            </a>
            <a href="/">
              <img alt="instagram" src="/facebook.svg" width="30px" className="mr-4" />
            </a>
            <img alt="instagram" src="/visa.jfif" width="30px" className="mr-2" />
            <img alt="instagram" src="/paypal.jfif" width="30px" className="mr-2" />
            <img alt="instagram" src="/mastercard.jfif" width="30px" />
          </Col>
        </Row>
      </Container>
      <div className="bg-dark pt-5 pb-5">
        <Container>
          <Row>
            <Col xs="12" xl="3" className="mb-3">
              <h5 className="text-light mb-3 font-weight-bold">Ο λογαριασμός μου</h5>

              <a href="/authentication/login">
                <p className="text-light">Σύνδεση</p>
              </a>
              <a href="/authentication/register">
                <p className="text-light">Εγγραφή</p>
              </a>
            </Col>
            <Col xs="12" xl="3" className="mb-3">
              <h5 className="text-light mb-3 font-weight-bold">Επικοινωνία</h5>

              <a href="/contact">
                <p className="text-light font-weight-bold">Στείλε μας μήνυμα</p>
                <p className="text-light ">shop@sovrakofanela.gr</p>
              </a>
            </Col>
            <Col xs="12" xl="3" className="mb-3">
              <a href="/">
                <h5 className="text-light font-weight-bold">Η ιστοσελίδα μας</h5>
              </a>
            </Col>
            <Col xs="12" xl="3" className="mb-3">
              <h5 className="text-light mb-3 font-weight-bold">Κοινωνικά δίκτυα</h5>

              <a href="https://www.instagram.com/george_headstone/" target="_blank">
                <p className="text-light ">Instagram</p>
              </a>
              <a href="https://www.facebook.com/georgeheadstone/" target="_black">
                <p className="text-light ">Facebook</p>
              </a>
            </Col>
          </Row>
          <Row className="justify-content-between mt-3">
            <Col xs="12" md="6">
              <img alt="img" src="lOGO_200PX.svg" width="220px" className="mt-5" />
            </Col>
            <Col xs="12" md="6" className="mt-5">
              <Form>
                <Form.Group>
                  <Form.Label className="text-light">
                    <h5 className="font-weight-bold">
                      Κάνε εγγραφή στο ενημερωτικό δελτίο και πάρε 10% έκπτωση
                    </h5>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    size="lg"
                    name="email"
                    placeholder="Διεύθυνση ηλεκτρονικού ταχυδρομείου"
                  />
                  <Button type="button" className="mt-1" size="lg">
                    Κάνε εγγραφή
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
