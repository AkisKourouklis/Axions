import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { apiUrl } from '../../../config/api';
import TextContainer from './Components/TextContainer';
import Messages from './Components/Messages';
import Input from './Components/Input';
import Dashbaord from '../Dashboard';
import { useRouter } from 'next/router';
import { Col, Row, Card } from 'react-bootstrap';

let socket;

const ChatRoom = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = router.query;

    socket = io(apiUrl);

    setRoom(room);
    setName(name);

    socket.emit('join', { name, room });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <Dashbaord>
      <Row className="mb-3">
        <Col>
          <h3>Συνομιλία</h3>
        </Col>
      </Row>
      <Row>
        <Col xs="12" xl="6" className="mb-4 mb-xs-0">
          <Card>
            <Card.Header>
              <p className="bold">{room}</p>
            </Card.Header>
            <Card.Body style={{ height: '300px', overflowY: 'scroll' }}>
              <Messages messages={messages} name={name} />
            </Card.Body>
            <Card.Footer>
              <Input
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
              />
            </Card.Footer>
          </Card>
        </Col>
        <Col xs="12" xl="6">
          <TextContainer users={users} />
        </Col>
      </Row>
    </Dashbaord>
  );
};

export default ChatRoom;
