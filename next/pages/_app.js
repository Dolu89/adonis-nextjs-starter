import React from 'react';
import App, { Container } from 'next/app';

import Auth from '../services/auth';

// Stylings
import 'bootstrap/dist/css/bootstrap.min.css';

export default class MyApp extends App {

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    
    const user = process.browser ? await Auth.clientAuth() : await Auth.serverAuth(ctx.req);
    
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    const auth = { user, isAuthenticated: !!user };

    return { pageProps, auth }
  }

  componentDidMount() {
  }

  render () {
    const { Component, pageProps, auth } = this.props

    return (
      <Container>
        <Component {...pageProps} auth={auth}/>
      </Container>
    )
  }
}