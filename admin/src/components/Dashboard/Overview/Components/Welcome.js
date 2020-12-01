import React, { useState, useEffect, useContext } from 'react';
import { apiUrl } from '../../../../config/api';
import { AuthContext } from '../../../../store/Context/Context';
import { Card } from 'react-bootstrap';
import axios from 'axios';

const Welcome = () => {
  const { auth } = useContext(AuthContext);
  const [user, setUser] = useState();

  const fetchUser = () => {
    if (auth.email) {
      axios
        .get(`${apiUrl}/users/${auth.email}`)
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
  }, [auth.email]);
  return (
    <>
      <Card className="shadow-sm" style={{ width: '100% ' }}>
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
