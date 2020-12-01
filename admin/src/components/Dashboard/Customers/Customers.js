import React from 'react';
import Dashboard from '../Dashboard';
import Clients from '../Overview/Components/Clients';
import { Row, Col } from 'react-bootstrap';

const Customers = () => {
  return (
    <Dashboard>
      <Row className="mb-3">
        <Col>
          <h3>Πελάτες</h3>
        </Col>
      </Row>
      <Clients />
    </Dashboard>
  );
};

export default Customers;
