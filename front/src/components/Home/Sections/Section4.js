import React from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';

const AboutMe = () => {
  return (
    <>
      <section className="section5 pt-5 pb-5 bg-primary">
        <Card className="w-75 mx-auto section5-card">
          <Card.Body>
            <Row className="text-center">
              <Col>
                <h3 className="font-weight-bold">Τι είναι η ιστοσελίδα μας ?</h3>
                <p>λίγες πληροφορίες για εμάς</p>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col xs="12" lg="4" className="text-center border-right">
                <h5>Ελληνικά Προιόντα</h5>
                <p>
                  Υποστιρίζουμε ελληνικές βιοτεχνιές. Όλα τα προιόντα μας είναι από
                  ελληνικούς κατεσκαυαστές
                </p>
              </Col>
              <Col xs="12" lg="4" className="text-center border-right">
                <h5>Αυθεντικότητα</h5>
                <p>
                  Ελληνικά αυθεντικά προιόντα, υψηλή ποιότητα εσώρουχων, ξεχωριστές
                  συσκευασίες και αυθεντική παράδωση
                </p>
              </Col>
              <Col xs="12" lg="4" className="text-center">
                <h5>Αντοπόκριση</h5>
                <p>
                  Λύνουμε όλα σου τα προβλήματα, γρήγορα αλλαγές, βοήθεια από την ομάδα
                  μας. Είμαστε δίπλα σου και σε βοηθάμε
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </section>
    </>
  );
};

export default AboutMe;
