import React, { useState } from 'react';
import { BsChatDots } from 'react-icons/bs';
import { Button, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Room from './Room';
import axios from 'axios';
import { publicApi } from '../../config/api';

export default () => {
  const [show, setShow] = useState(false);
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const email = useSelector((state) => state.auth.email);
  const user = useSelector((state) => state.auth.user);
  const [chat, setChat] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  const toggleChat = () => {
    setLoading(true);
    axios
      .post(
        `${publicApi}/email/support-chat`,
        { email },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        }
      )
      .then(() => {
        setChat(true);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="chat-bumble mt-3 mt-xl-0" onClick={toggleShow}>
        <BsChatDots />
      </div>
      <div className={show ? 'chat-join-container' : 'd-none'}>
        {chat ? (
          <>
            <Room email={email} user={user} />
          </>
        ) : (
          <>
            {auth ? (
              <>
                <Row>
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
