import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Dashboard from '../Dashboard';
import Alert from '../Alerts/Alert';
import { apiUrl } from '../../../config/api';
import EmailList from './Components/EmailList';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
});

const Newsletter = () => {
  const [quill, setQuill] = useState('');
  const [subject, setSubject] = useState();
  const [loading, setLoading] = useState();
  const [alert, setAlert] = useState();
  const [emails, setEmails] = useState([]);

  // toggle alert
  const toggleAlert = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 4000);
  };

  const changeQuil = (value) => {
    setQuill(value);
  };

  const handleSubject = (e) => {
    const { value } = e.target;
    setSubject(value);
  };

  const sentEmail = () => {
    setLoading(true);
    axios
      .post(`${apiUrl}/email/email`, { email: emails, subject, content: quill })
      .then((response) => {
        setLoading(false);
        toggleAlert();
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchEmails = () => {
    axios
      .get(`${apiUrl}/subscribers/all`, {
        headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
      })
      .then((response) => {
        setEmails(response.data.subscribers.map((data) => data.email));
      });
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <>
      <Dashboard>
        <Row className="mb-3">
          <Col>
            <h3>Ενημερωτικό Δελτίο</h3>
          </Col>
        </Row>
        {alert ? <Alert message="Επιτυχία" /> : null}
        <Card>
          <Card.Header>
            <h5>Αποστολή email σε όλους τους πελάτες</h5>
          </Card.Header>
          <Card.Body>
            <Form.Group>
              <Form.Label>Θέμα email</Form.Label>
              <Form.Control type="text" onChange={(e) => handleSubject(e)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Περιεχόμενο</Form.Label>
              <ReactQuill value={quill} onChange={changeQuil} />
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            <Row>
              <Col className="text-right">
                <Button onClick={sentEmail} disabled={loading}>
                  {loading ? 'Περιμένετε' : 'Αποστολή'}
                </Button>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
        <Row className="mt-3">
          <Col>
            <EmailList />
          </Col>
        </Row>
      </Dashboard>
    </>
  );
};

export default Newsletter;
