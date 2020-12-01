import React, { useState, useEffect } from 'react';
import { axiosCallApi, apiUrl } from '../../../config/api';
import { Col, Row, Card, Button, Spinner } from 'react-bootstrap';
import Alert from '../Alerts/Alert';
import { MdEdit } from 'react-icons/md';
import Dashboard from '../Dashboard';
import NavbarModal from './Components/Navbar';

const Design = () => {
  const [show, setShow] = useState(false);
  const [design, setDesign] = useState();
  const [alert, setAlert] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // fetchDesign
  const fetchDesign = () => {
    axiosCallApi.get(`${apiUrl}/design/`).then((response) => {
      setDesign(response.data);
    });
  };

  // toggle alert
  const toggleAlert = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 4000);
  };

  useEffect(() => {
    fetchDesign();
  }, []);

  return (
    <Dashboard>
      {alert ? <Alert message="Επιτυχία" /> : null}
      <Row className="mb-3">
        <Col xs="12" xl="6">
          <h3>Σχεδιασμός ιστοσελίδας</h3>
        </Col>
      </Row>
      {design ? (
        <>
          <Row>
            <Col>
              <Card className="w-100">
                <Card.Body className="w-100 d-flex justify-content-between align-items-center">
                  <span>Επικεφαλίδα</span>{' '}
                  <Button className="ml-auto" onClick={handleShow}>
                    <MdEdit />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <NavbarModal
            show={show}
            handleClose={handleClose}
            data={design}
            toggleAlert={toggleAlert}
            fetchDesign={fetchDesign}
          />
        </>
      ) : (
        <Spinner className="mb-1" animation="border" size="sm" />
      )}
    </Dashboard>
  );
};

export default Design;
