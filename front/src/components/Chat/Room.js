import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Input from './Components/Input';
import Messages from './Components/Messages';
import { publicApi } from '../../config/api';
import { Card } from 'react-bootstrap';

let socket;

export default ({ email, user }) => {
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io(publicApi);

    socket.emit('join', { name: user, room: email });

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
    <>
      <Card style={{ width: '100%', height: '100%' }}>
        <Card.Header>
          <p className="bold text-dark">{email}</p>
        </Card.Header>
        <Card.Body style={{ height: '100px', overflowY: 'scroll', padding: '0' }}>
          <Messages messages={messages} name={user} />
        </Card.Body>
        <Card.Footer>
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </Card.Footer>
      </Card>
    </>
  );
};
