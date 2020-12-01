import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { apiUrl } from '../../../../config/api';

const Welcome = () => {
  const email = useSelector((state) => state.auth.email);
  const [user, setUser] = useState();

  const fetchUser = () => {
    if (email) {
      axios
        .get(`${apiUrl}/users/${email}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchUser();
  }, [email]);
  return (
    <>
      <Card style={{ width: '100% ' }}>
        <Card.Body>
          <Card.Title>
            Καλός ήρθες
            <span className="pl-1">{user?.name}</span>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Δες τις τελευταίες ενημερώσεις και τους καινούριους σου πελάτες
          </Card.Subtitle>

          <Card.Link href="/dashboard/courses">Σειρές Μαθημάτων</Card.Link>
          <Card.Link href="/dashboard/customers">Πελάτες</Card.Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default Welcome;
