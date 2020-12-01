import React, { useState, useEffect, useCallback } from 'react';
import { Card, Table, Button, ButtonGroup, Modal, Form, Row, Col } from 'react-bootstrap';
import { MdEmail } from 'react-icons/md';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { apiUrl } from '../../../../config/api';
import Pagination from '../../Courses/Components/Pagination';
import Search from '../../Courses/Components/Search';
import Alert from '../../Alerts/Alert';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
});

const EmailList = () => {
  const [clients, setClients] = useState();
  const [skip, setSkip] = useState(1);
  const [filter, setFilter] = useState('');
  const [perpage, setPerpage] = useState(10);
  const [showEdit, setShowEdit] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [clientId, setClientId] = useState();
  const [quill, setQuill] = useState('');
  const [alert, setAlert] = useState();
  const [subject, setSubject] = useState();
  const [loading, setLoading] = useState();

  // toggle alert
  const toggleAlert = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 4000);
  };

  const toggleShowNewsletter = (id) => {
    setShowNewsletter(true);
    setClientId(id);
  };
  const toggleHideNewsletter = () => {
    setShowNewsletter(false);
  };

  const fetchClients = () => {
    axios
      .get(
        `${apiUrl}/email/newsletter?perPage=${perpage}&skip=${skip}&filter=${filter}`,
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then((response) => {
        setClients(response.data.newsletters);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changePerPage = useCallback(
    (e) => {
      setPerpage(e.target.value);
    },
    [perpage, setPerpage]
  );

  // change page and searh function
  const changePage = useCallback(
    (type) => {
      if (type === 'next') {
        setSkip(skip + 1);
      } else {
        setSkip(skip - 1);
      }
      if (skip < 1) {
        setSkip(1);
      }
    },
    [skip, setSkip]
  );
  const changeFilter = useCallback(
    (text) => {
      setFilter(text.target.value);
      setSkip(1);
      fetchClients();
    },
    [setFilter]
  );

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
      .post(`${apiUrl}/email/email`, { email: clientId, subject, content: quill })
      .then((response) => {
        setLoading(false);
        toggleHideNewsletter();
        toggleAlert();
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchClients();
  }, [skip, filter, perpage]);

  return (
    <>
      {alert ? <Alert message="Επιτυχία" /> : null}
      <Search onChange={changeFilter} />
      <Card>
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th className="desktop">#</th>
                <th>Διευθυνση Email</th>
              </tr>
            </thead>
            <tbody>
              {clients?.map((data, i) => {
                return (
                  <tr key={data._id}>
                    <td className="desktop">{i}</td>
                    <td>{data.email}</td>
                    <td>
                      <ButtonGroup className="mr-2" aria-label="First group">
                        <Button onClick={() => toggleShowNewsletter(data.email)}>
                          <MdEmail />
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Row>
            <Col>
              <Pagination changePage={changePage} skip={skip} />
            </Col>
            <Col>
              <Form.Control as="select" onChange={changePerPage}>
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="1000">1000</option>
              </Form.Control>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {/* MODAL NEWSLETTER */}
      <Modal show={showNewsletter} onHide={toggleHideNewsletter} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Στείλε email</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Θέμα email</Form.Label>
            <Form.Control type="text" onChange={(e) => handleSubject(e)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Περιεχόμενο</Form.Label>
            <ReactQuill value={quill} onChange={changeQuil} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleHideNewsletter}>
            Έξοδος
          </Button>
          <Button variant="primary" type="submit" onClick={sentEmail} disabled={loading}>
            {loading ? 'Περιμένετε' : 'Αποστολή'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmailList;
