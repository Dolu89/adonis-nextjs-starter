import React from 'react';
import BaseLayout from '../layouts/BaseLayout';

export default Component =>
  class withAuth extends React.Component {

    static async getInitialProps(args) {
      const pageProps = await Component.getInitialProps && await Component.getInitialProps(args);

      return { ...pageProps };
    }

    renderProtectedPage() {
      const { isAuthenticated, user } = this.props.auth;

      if (!isAuthenticated) {
        return (
          <BaseLayout {...this.props.auth}>
            <div> You are not authenticated. Please Login to access this page. </div>
          </BaseLayout>
        )
      } else {
        return (<Component {...this.props} />)
      }
    }

    render() {
      return this.renderProtectedPage()
    }
  }


