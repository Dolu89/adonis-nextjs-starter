import React from 'react';
import Header from './Header';
import Head from 'next/head';

const BaseLayout = (props) => {
  const { className, children, isAuthenticated, user } = props;
  const headerType = props.headerType || 'default';
  const title = props.title || 'Adonext';
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta property="og:title" content="" />
        <meta property="og:locale" content="en_EU" />
        <meta property="og:url" content={`${process.env.BASE_URL}`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="" />
        <link rel="icon" type="image/ico" href="/static/favicon.ico" />
      </Head>
      <div className="layout-container" >
        <Header className={`port-nav-${headerType}`}
          isAuthenticated={isAuthenticated}
          user={user} />
        <main className={`cover ${className}`}>
          <div className="wrapper">
            {children}
          </div>
        </main>
      </div>
    </React.Fragment>
  )
}

export default BaseLayout;
