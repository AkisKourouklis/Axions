import Head from 'next/head';
import HttpsRedirect from 'react-https-redirect';
import React, { useState, useEffect } from 'react';
import {
  AuthContext,
  CheckoutContext,
  CatalogContext,
  PriceContext
} from './store/Context/Context';
import { fetchConfig } from './utils/Config';
import { Spinner } from 'react-bootstrap';
import Commingsoon from '../src/components/CommingSoon/CommingSoon';
import UsePersistedState from './utils/usePersistedState';

const MyApp = ({ Component, pageProps }) => {
  const [favicon, setFavicon] = useState();
  const [metatitle, setMetatitle] = useState('undefined');
  const [metadescription, setMetadescription] = useState('undefined');
  const [config, setConfig] = useState();
  const [checkout, setCheckout] = UsePersistedState('checkout', []);
  const [price, setPrice] = useState([]);
  const [catalogfilters, setCatalogFilters] = useState({
    filter: '',
    filter2: '',
    filter3: '',
    filter4: '',
    filter5: ''
  });
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    isError: false,
    id: '',
    email: '',
    name: '',
    token: ''
  });

  const fetchStart = async () => {
    const _config = await fetchConfig();
    setFavicon(_config?.favicon);
    setMetatitle(_config?.metatitle);
    setMetadescription(_config?.metadescription);
    setConfig(_config);
  };

  useEffect(() => {
    setAuth({
      isAuthenticated: localStorage.getItem('isAuthenticated'),
      id: localStorage.getItem('id'),
      email: localStorage.getItem('email'),
      name: localStorage.getItem('name'),
      token: localStorage.getItem('token')
    });
    fetchStart();
  }, []);

  return (
    <>
      <Head>
        <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
        <meta name="description" content={metadescription} />
        <title>{metatitle}</title>
        {favicon ? <link rel="shortcut icon" href={favicon} /> : null}
      </Head>
      <HttpsRedirect>
        <CatalogContext.Provider value={{ catalogfilters, setCatalogFilters }}>
          <AuthContext.Provider value={{ auth, setAuth }}>
            <PriceContext.Provider value={{ price, setPrice }}>
              <CheckoutContext.Provider value={{ checkout, setCheckout }}>
                {config ? (
                  <>
                    {config?.isLive ? (
                      <Component {...pageProps} />
                    ) : (
                      <>
                        {auth.isAuthenticated ? (
                          <Component {...pageProps} />
                        ) : (
                          <Commingsoon />
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <div
                    style={{ height: '100vh' }}
                    className="d-flex justify-content-center align-items-center bg-dark"
                  >
                    <Spinner
                      className="mb-1"
                      animation="border"
                      size="lg"
                      variant="light"
                    />
                  </div>
                )}
              </CheckoutContext.Provider>
            </PriceContext.Provider>
          </AuthContext.Provider>
        </CatalogContext.Provider>
      </HttpsRedirect>
    </>
  );
};

export default MyApp;
