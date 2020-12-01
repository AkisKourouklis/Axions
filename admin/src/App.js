import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { AuthContext } from './store/Context/Context';

const MyApp = ({ Component, pageProps }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    isError: false,
    id: '',
    email: '',
    name: '',
    token: ''
  });

  const start = () => {
    setAuth({
      isAuthenticated: Boolean(localStorage.getItem('isAuthenticated')),
      id: localStorage.getItem('id'),
      email: localStorage.getItem('email'),
      name: localStorage.getItem('name'),
      token: localStorage.getItem('jwtToken')
    });
  };

  useEffect(() => {
    start();
  }, []);
  return (
    <>
      <Head>
        <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
        <title>Axions Dashboard</title>
      </Head>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <Component {...pageProps} />
      </AuthContext.Provider>
    </>
  );
};

export default MyApp;
