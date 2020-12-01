import React from 'react';
import { Accordion, Button, Card, Row, Col } from 'react-bootstrap';

const Section6 = () => {
  return (
    <section className="pt-5 pb-5 bg-light">
      <Row>
        <Col>
          <h3 className="text-center">Συχνές ερωτήσεις</h3>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Για πόσο καιρό είναι αυτό το online course?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  Για πάντα! Εφόσον το αγοράσεις θα έχεις πρόσβαση για πάντα και στο
                  course και στο Facebook Group.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  Τι είναι το Pre-Vulture;
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  Το Pre-Vulture θα σου μάθει πως να φτάσεις στο 10/10 χαρούμενος, πως να
                  φτάσεις στην νοητική αφθονία χωρίς να κυνηγάς τα αποτελέσματα και να
                  είσαι θύμα των καταστάσεων. Να γίνεις κυρίαρχος του εαυτού σου και να
                  αγαπήσεις τον εαυτό σου όπως ακριβώς είναι
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                  Τι είναι το The Vulture;
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>Έρχεται σύντομα</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="3">
                  Τι γίνεται αν δεν δουλέψει;
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  Δεν είναι quick fix! ΠΡΕΠΕΙ να λάβεις μαζική δράση. Δεν είναι ένα
                  πρόγραμμα που θα σου προσφέρει πληροφορίες αλλά θα σου δώσει ένα πλάνο
                  για δράση καταλαβαίνοντας βασικά concepts.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="4">
                  Αν δεν είναι τελικά για εμένα μπορώ να ζητήσω τα χρήματά μου πίσω;
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="4">
                <Card.Body>
                  Ναι, αν δεν μείνεις ευχαριστημένος από το πρόγραμμα, θα πάρεις τα
                  χρήματά σου πίσω και θα κρατήσεις το course που έχεις επιλέξει.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="5">
                  DISCLAIMER
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="5">
                <Card.Body>
                  Αυτό το course είναι ΒΑΣΙΣΜΕΝΟ στο πρόγραμμα Transformation Mastery του
                  Julien Blanc & στις ακαδημαϊκές γνώσεις ψυχολογίας από τα 4 χρόνια
                  σπουδών μου στο University of Essex. Προσφέρεται υποστήριξη και όχι
                  επιστημονική βοήθεια. Δεν είναι ένα επιστημονικό πρόγραμμα και δεν
                  αντικαθιστά τις επισκέψεις σε επαγγελματίες ψυχολόγους ή ψυχιάτρους.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>
    </section>
  );
};

export default Section6;
