import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import withAuth from '../components/hoc/withAuth';

class Account extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        return (
            <BaseLayout {...this.props.auth}>
                <div>This is an account page. You can access to this page because your are logged in</div>
                <div>isAuthenticated : {isAuthenticated.toString()}</div>
                <div>user :
                    {user &&
                        Object.keys(user).map(function (key) {
                            return <div className="whiteSpaceNoWrap" key={key}>{key} : {user[key]}</div>
                        })
                    }
                </div>
            </BaseLayout>
        )
    }

}

export default withAuth()(Account)