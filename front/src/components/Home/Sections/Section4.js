import React from 'react';
import { Col, Row } from 'shards-react';

const AboutMe = () => {
  return (
    <>
      <div className="aboutMe-container">
        <Row className="aboutMe-wrapper">
          <Col xs="12">
            <div style={{ marginBottom: '20px' }}>
              <p className="aboutMe-title">
                Ασχολούμαι με το Game τα τελευτάια 6 χρονια. Διάβασε αυτό.
              </p>
            </div>
            <p className="aboutMe-content" style={{ marginBottom: '10px !important' }}>
              To Game φαινεται φανταχτερό , μιλώντας σε γρούπ με μοντέλα, καινούργιες
              εμπειρίες , απίστευτα αποτελέσματα και η λίστα συνεχίζεται...
            </p>
            <p className="aboutMe-content" style={{ marginBottom: '10px !important' }}>
              Θες να μάθεις την αλήθεια?
            </p>
            <p className="aboutMe-content" style={{ marginBottom: '10px !important' }}>
              Το αληθινό Game είναι πολύ πιο λεπτό .... πολύ πιο διακριτικό.
            </p>
            <p className="aboutMe-content" style={{ marginBottom: '10px !important' }}>
              Για την ακρίβεια, δεν χρειαζεσαι ατακες, ουτε το "κλαρινογαμπρός" στύλ ,
              ουτε τη συμπεριφορά του "γ@μιά" και πάει λέγοντας.
            </p>
            <p className="aboutMe-content" style={{ marginBottom: '10px !important' }}>
              Βεβαίως μπορείς να ΜΙΜΙΘΕΙΣ αυτα τα χαρακτηριστικά - ενέργειες, αλλα μόνο η
              μίμιση δεν θα σε φτάσει στο σημείο που πραγματικά ποθείς.
            </p>
            <p className="aboutMe-content" style={{ marginBottom: '10px !important' }}>
              Αυτο που λειτουργεί ομως 100% ειναι... Να νιώθεις ολοκληρωμένος ΜΕΣΑ ΣΟΥ.
            </p>
            <p className="aboutMe-content" style={{ marginBottom: '10px !important' }}>
              Αφου ΟΝΤΩΣ λάβεις δραση πάνω σε αυτό, ο κόσμος θα ΘΕΛΕΙ να βρίσκεται δίπλα
              σου.
            </p>
            <p className="aboutMe-content">
              Οι άνθρωποι θα ελκύονται , σχεδον μαγνητικά, πάνω σου μονο απο την απαλότητα
              στη φωνή σου και τα ηρεμία στα μάτια σου . Θα εμπνέεις εμπιστοσύνη.
              <br />Η πραγματική και μόνιμη αλλαγή ερχεται απο το ΕΣΩΤΕΡΙΚΟ σου.
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AboutMe;
