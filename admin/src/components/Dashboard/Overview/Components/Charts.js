import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { apiUrl } from '../../../../config/api';

const Charts = () => {
  const [transactions, setTransactions] = useState();

  const fetchTransactions = () => {
    axios
      .get(`${apiUrl}/transaction/all`, {
        headers: { authorization: 'Bearer ' + localStorage.getItem('jwtToken') }
      })
      .then((response) => {
        setTransactions(response.data?.map((data) => data.transaction.value));
      });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <Card className="shadow-sm">
        <Card.Body>{transactions?.reduce((a, b) => a + b, 0)}€</Card.Body>
      </Card>
    </>
  );
};

export default Charts;
