import React, { useState, useEffect, useCallback } from 'react';
import { Card, Table, Button, ButtonGroup, Modal, Form } from 'react-bootstrap';
import { MdEmail } from 'react-icons/md';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { apiUrl } from '../../../../config/api';
import Pagination from '../../Shared/Pagination/Pagination';
import Search from '../../Shared/Search/Search';
import Alert from '../../Alerts/Alert';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
});

const EmailList = () => {
  const [clients, setClients] = useState();
  const [skip, setSkip] = useState(1);
  const [filter, setFilter] = useState('');
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
      .get(`${apiUrl}/email/newsletter?perPage=10&skip=${skip}&filter=${filter}`, {
        headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
      })
      .then((response) => {
        setClients(response.data.newsletters);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // change page and searh function
  const changePage = useCallback(
    (type) => {
      if (type === 'next') {
        setSkip(skip + 1);
      } else {
        setSkip(skip - 1);
      }
      if (skip === 0) {
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
  }, [skip, filter]);

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
          <Pagination changePage={changePage} skip={skip} />
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
