import { Provider } from 'react-redux';
import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import withRedux from 'next-redux-wrapper';
import { makeStore } from './store/store';
import HttpsRedirect from 'react-https-redirect';
import axios from 'axios';
import { publicApi } from './config/api';

// eslint-disable-next-line react/prefer-stateless-function
export default withRedux(makeStore)(
  class MyApp extends App {
    state = {
      config: {},
      favicon: '',
      metatitle: 'undefined',
      metadescription: 'undefined'
    };

    static async getInitialProps({ Component, ctx }) {
      let pageProps = {};

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }

      return { pageProps };
    }

    fetchConfig() {
      axios
        .get(`${publicApi}/config/all/client`, {
          headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        })
        .then((response) => {
          this.setState({
            config: response.data[0],
            metatitle: response.data[0]?.metatitle,
            metadescription: response.data[0]?.metadescription
          });
          if (response.data[0].favicon) {
            axios
              .post(
                `${publicApi}/courses/s3/single`,
                { file: response.data[0].favicon },
                {
                  headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
                }
              )
              .then((doc) => {
                this.setState({
                  favicon: doc.data
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
    }

    componentDidMount() {
      this.fetchConfig();
    }

    render() {
      const { Component, pageProps, store } = this.props;
      const { favicon, metadescription, metatitle } = this.state;
      return (
        <>
          <Head>
            <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
            <meta property="og:image" content="/logo.png" />
            <meta name="description" content={metadescription} />
            <title>{metatitle || 'The Vulture by George Headstone'}</title>
            {favicon ? <link rel="shortcut icon" href={favicon} /> : null}
          </Head>
          <HttpsRedirect>
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
          </HttpsRedirect>
        </>
      );
    }
  }
);
