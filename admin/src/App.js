import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { makeStore } from './store/store';

export default withRedux(makeStore)(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
      let pageProps = {};

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }

      return { pageProps };
    }

    render() {
      const { Component, pageProps, store } = this.props;

      return (
        <>
          <Head>
            <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
            <title>AXIONS Dashboard</title>
            <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css" />
            <link
              href="https://fonts.googleapis.com/css?family=Poppins:300,400,600&display=swap"
              rel="stylesheet"
            />
          </Head>

          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </>
      );
    }
  }
);
