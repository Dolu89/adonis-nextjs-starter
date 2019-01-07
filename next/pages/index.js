import React from 'react';

import BaseLayout from '../components/layouts/BaseLayout';

import { Button, Container, Row, Col } from 'reactstrap';

class Index extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    console.log(isAuthenticated)
    return (
      <BaseLayout {...this.props.auth}>
        <div>isAuthenticated : {isAuthenticated.toString()}</div>
        <div>user :
          { user &&
            Object.keys(user).map(function(key) {
              return <div className="whiteSpaceNoWrap" key={key}>{key} : { user[key] }</div>
           })
          }
        </div>
      </BaseLayout>
    )
  }
}
export default Index;