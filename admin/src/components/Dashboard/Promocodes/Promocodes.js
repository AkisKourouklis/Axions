import React, { useState, useEffect, useCallback } from 'react';
import { Card, Table, Row, Col, Button, Modal, ButtonGroup } from 'react-bootstrap';
import { MdEdit, MdAdd, MdDelete } from 'react-icons/md';
import axios from 'axios';
import Search from '../Courses/Components/Search';
import Pagination from '../Courses/Components/Pagination';
import AddCode from './Components/AddCode';
import EditCode from './Components/EditCode';
import { apiUrl } from '../../../config/api';
import Dashboard from '../Dashboard';
import Alert from '../Alerts/Alert';

const Promocodes = () => {
  const [codes, setCodes] = useState();
  const [codeId, setCodeId] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [skip, setSkip] = useState(1);
  const [filter, setFilter] = useState('');
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  // toggle alert
  const toggleAlert = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 4000);
  };

  // delete modal
  const handleShowDelete = (id) => {
    setCodeId(id);
    setShowDelete(true);
  };
  const hideDelete = () => {
    setShowDelete(false);
  };
  // edit modal
  const handleShowΕdit = (id) => {
    setCodeId(id);
    setShowEdit(true);
  };
  const hideEdit = () => {
    setShowEdit(false);
  };
  // add modal
  const toggleShowAdd = (id) => {
    setShowAdd(true);
    setCodeId(id);
  };
  const toggleHideAdd = () => {
    setShowAdd(false);
  };

  // change page and searh function
  const changePage = useCallback(
    (type) => {
      if (type === 'next') {
        setSkip(skip + 1);
      } else {
        setSkip(skip - 1);
      }
    },
    [skip, setSkip]
  );
  const changeFilter = useCallback(
    (text) => {
      setFilter(text.target.value);
    },
    [setFilter]
  );

  const fetchCodes = () => {
    axios
      .get(`${apiUrl}/promoCodes/all?perPage=5&skip=${skip}&filter=${filter}`, {
        headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
      })
      .then((response) => {
        setCodes(response.data.promoCodes);
      });
  };

  const onSubmitAdd = (values) => {
    axios
      .post(
        `${apiUrl}/promoCodes/new`,
        {
          name: values.name,
          isPercentage: values.isPercentage,
          value: values.value,
          appliesOn: values.appliesOn
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then((response) => {
        toggleAlert();
        toggleHideAdd();
        fetchCodes();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSubmitEdit = (values) => {
    axios
      .patch(
        `${apiUrl}/promoCodes`,
        {
          _id: codeId,
          name: values.name,
          isPercentage: values.isPercentage,
          value: values.value,
          appliesOn: values.appliesOn
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then(() => {
        toggleAlert();
        hideEdit();
        fetchCodes();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // submit delete course
  const deleteCode = () => {
    setLoading(true);
    axios
      .post(`${apiUrl}/promoCodes/delete/${codeId}`, null, {
        headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
      })
      .then((response) => {
        setLoading(false);
        hideDelete();
        toggleAlert();
        fetchCodes();
      });
  };

  useEffect(() => {
    fetchCodes();
  }, [skip, filter]);

  return (
    <>
      <Dashboard>
        {alert ? <Alert message="Επιτυχία" /> : null}
        <Row className="mb-3">
          <Col xs="12" xl="6">
            <h3>Κωδικοί εκπτώσεων</h3>
          </Col>
          <Col xs="12" xl="6" className="text-right">
            <Button className="d-flex align-items-center ml-auto" onClick={toggleShowAdd}>
              <MdAdd className="mr-1" />
              Προσθήκη κωδικού
            </Button>
          </Col>
        </Row>
        <Search onChange={changeFilter} />
        <Card>
          <Card.Body>
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th className="desktop">#</th>
                  <th>Όνομα</th>
                  <th>Τις %</th>
                  <th>Τιμή</th>
                  <th>Μαθήματα</th>
                  <th>Εντολές</th>
                </tr>
              </thead>
              <tbody>
                {codes?.map((data, i) => {
                  return (
                    <tr key={data._id}>
                      <td className="desktop">{i}</td>
                      <td>{data.name}</td>
                      <td>{data.isPercentage.toString()}</td>
                      <td>{data.value}</td>
                      <td>{data.appliesOn}</td>
                      <td>
                        <ButtonGroup className="mr-2" aria-label="First group">
                          <Button
                            onClick={() => {
                              handleShowΕdit();
                              setCodeId(data._id);
                            }}
                          >
                            <MdEdit />
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => {
                              handleShowDelete();
                              setCodeId(data._id);
                            }}
                          >
                            <MdDelete />
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
        {/* MODAL ADD CLIENT */}
        <Modal show={showAdd} onHide={toggleHideAdd} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              <h5>Προσθήκη κωδικού</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddCode onSubmit={onSubmitAdd} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleHideAdd}>
              Έξοδος
            </Button>
            <Button variant="primary" type="submit" form="addCode-form">
              Αποθήκευση κωδικού
            </Button>
          </Modal.Footer>
        </Modal>
        {/* MODAL EDIT CLIENT */}
        <Modal show={showEdit} onHide={hideEdit} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              <h5>Επεξεργασία κωδικού έκπτωσης</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditCode id={codeId} onSubmit={onSubmitEdit} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideEdit}>
              Έξοδος
            </Button>
            <Button variant="primary" type="submit" form="editCode-form">
              {loading ? <>Περιμένετε</> : <>Αποθήκευση κωδικού</>}
            </Button>
          </Modal.Footer>
        </Modal>
        {/* MODAL DELETE COURSE */}
        <Modal show={showDelete} onHide={hideDelete} size="md">
          <Modal.Header closeButton>
            <Modal.Title>
              <h5>Διαγραφή μαθήματος</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>Θέλεις να διαγράψεις αυτόν τον κωδικό έκπτωσης ?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideDelete}>
              Έξοδος
            </Button>
            <Button
              variant="danger"
              type="button"
              onClick={deleteCode}
              disabled={loading}
            >
              {loading ? <>Περιμένετε</> : <>Διαγραφή Μαθήματος</>}
            </Button>
          </Modal.Footer>
        </Modal>
      </Dashboard>
    </>
  );
};

export default Promocodes;
