import React from 'react';
import dynamic from 'next/dynamic';
import { Spinner } from 'react-bootstrap';
import Dashboard from '../Dashboard';

const Welcome = dynamic(() => import('./Components/Welcome'), {
  loading: () => <Spinner className="mb-1" animation="border" size="sm" />
});
const Clients = dynamic(() => import('./Components/Clients'), {
  loading: () => <Spinner className="mb-1" animation="border" size="sm" />
});
const Charts = dynamic(() => import('./Components/Charts'), {
  loading: () => <Spinner className="mb-1" animation="border" size="sm" />
});

const Overview = () => {
  return (
    <>
      <Dashboard>
        <section>
          <Welcome />
        </section>
        <section className="pt-3">
          <h5>Συνολικά έσοδα</h5>
          <Charts />
        </section>
        <section className="pt-3">
          <h5>Πελάτες</h5>
          <Clients />
        </section>
      </Dashboard>
    </>
  );
};

export default Overview;
