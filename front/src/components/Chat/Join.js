import React, { useState, useContext } from 'react';
import { BsChatDotsFill } from 'react-icons/bs';
import { Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Room from './Room';
import { publicApi } from '../../config/api';
import { AuthContext } from '../../store/Context/Context';

export default () => {
  const [show, setShow] = useState(false);
  const { auth } = useContext(AuthContext);
  const [chat, setChat] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  const toggleChat = () => {
    setLoading(true);
    axios
      .post(`${publicApi}/email/support-chat`, auth.email, {
        headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
      })
      .then(() => {
        setChat(true);
        setLoading(false);
      });
  };

  return (
    <>
      <div onClick={toggleShow}>
        <BsChatDotsFill
          className="hover icon"
          style={{ color: '#fff', fontSize: '25px' }}
        />
      </div>
      <div className={show ? 'chat-join-container bg-secondary' : 'd-none'}>
        {chat ? (
          <>
            <Room email={auth.email} user={auth.name} />
          </>
        ) : (
          <>
            {auth ? (
              <>
                <Row>
                  <Col xs="12" className="mb-1">
                    <Button href="/contact" block onClick={toggleShow} variant="info">
                      Επικοινωνία
                    </Button>
                  </Col>
                  <Col xs="12">
                    <Button disabled={loading} onClick={toggleChat} variant="light" block>
                      {loading ? 'Περιμένετε' : 'Έναρξη συνομιλίας'}
                    </Button>
                  </Col>
                  <Col xs="12" className="mt-1">
                    <Button block onClick={toggleShow} variant="danger">
                      Έξοδος
                    </Button>
                  </Col>
                </Row>
              </>
            ) : (
              <Row className="text-center">
                <Col>
                  <h5>Κάνε σύνδεση ή εγγραφή</h5>
                  <Row>
                    <Col xs="12" className="mb-1">
                      <Button href="/contact" block onClick={toggleShow} variant="info">
                        Επικοινωνία
                      </Button>
                    </Col>
                    <Col xs="12">
                      <Button href="/authentication/login" variant="light" block>
                        Σύνδεση
                      </Button>
                    </Col>
                    <Col xs="12" className="mt-1">
                      <Button block onClick={toggleShow} variant="danger">
                        Έξοδος
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
          </>
        )}
      </div>
    </>
  );
};
