import React from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import ReactPlayer from 'react-player';

const Testimonials = () => {
  return (
    <section className="bg-light pt-5 pb-5">
      <Row>
        <Col className="text-center">
          <h3>Δες τι έχουν πει οι μαθητές μου</h3>
          <p>Testimonial</p>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs="12" xl="6" className="mt-1 mb-1">
          <ReactPlayer url="https://www.youtube.com/watch?v=BBW9i51HtVk" width="100%" />
        </Col>
        <Col xs="12" xl="6" className="mt-1 mb-1">
          <ReactPlayer url="https://www.youtube.com/watch?v=EC6lI1Ftn2M" width="100%" />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs="12" xl="4" className="mt-1 mb-1">
          <Card>
            <Card.Header className="bg-primary">
              <h5 className="text-light">Παναγιώτης Μ.</h5>
            </Card.Header>
            <Card.Body style={{ minHeight: '330px' }}>
              Αρχικά θέλω να πω ότι με βοήθησες στο να καταλάβω ότι δεν χρειάζομαι τις
              γυναίκες για να είμαι ευτυχισμένος έχω ήδη την αφθονία, βρήκα τους λόγους
              τους οποίους δεν μπορούσα να μιλήσω στις γυναίκες, έμαθα να βρίσκω θετικές
              λύσεις σε αρνητικά γεγονότα, να Ρίχνω τον εγωισμό μου (από τα δυσκολότερα
              πάνω μου ),έμαθα να λέω εγώ τι δεν έκανα καλά σε μια κατάσταση
            </Card.Body>
          </Card>
        </Col>
        <Col xs="12" xl="4" className="mt-1 mb-1">
          <Card>
            <Card.Header className="bg-primary">
              <h5 className="text-light">Theo K.</h5>
            </Card.Header>
            <Card.Body style={{ minHeight: '330px' }}>
              Καλησπερα κοουτς!!το ξερω οτι δεν ειναι επικαιρο λογω της καταστασης αλλα
              πραγματικα η κληση που καναμε με βοηθησε οχι μονο απο αυτα που μ ειπες αλλα
              και το ηθος και τη συμπεριφορα που εδειξες!!νιωθω πραγματικα ευγνωμων που
              πηρες την αποφαση να βοηθησεις ολους εμας γιατι θα το κανεις τελεια!!σ
              ευχαριστω πολυ Τζωρτζ!!μοναδικο!
            </Card.Body>
          </Card>
        </Col>
        <Col xs="12" xl="4" className="mt-1 mb-1">
          <Card>
            <Card.Header className="bg-primary">
              <h5 className="text-light">Παναγιώτης Γ.</h5>
            </Card.Header>
            <Card.Body style={{ minHeight: '330px' }}>
              Ο Γιώργος με βοήθησε αρχικά στο να μην εστιάζω στο πρόβλημα αλλά στην λύση.
              Με βοήθησε στο να μην με νοιάζει πλέον η γνώμη των άλλων για έμενα. Μου
              σύστησε τον διαλογισμό που με έχει βοηθήσει αρκετά στο να ηρεμώ,να βρισκώ τα
              προβλήματα που με απασχολούν και να τα αφήνω να φύγουν. Τέλος με βοήθησε να
              τα έχω καλά με τον εαυτό μου,το οποίο είναι απαραίτητο συστατικό για να
              είμαι καλά και με τους γύρω μου.
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default Testimonials;
