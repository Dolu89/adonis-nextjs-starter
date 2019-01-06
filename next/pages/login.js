import React, { Component } from 'react'
import BaseLayout from '../components/layouts/BaseLayout';
import { Button, Alert } from 'reactstrap'
import Auth from '../services/auth'

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',

            errorMessage: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
    }

    handleChange(event) {
        const target = event.target, value = target.value, name = target.name;
        this.setState({ [name]: value });
    }

    async submit(email, password) {
        const response = await Auth.login(email, password)
        if (!response.error) {
            window.location = "/";
        }
        else {
            this.setState({ errorMessage: 'User or password is incorrect' })
        }
    }

    render() {
        return (
            <BaseLayout>
                {
                    this.state.errorMessage !== '' ?
                        <Alert color="danger">{this.state.errorMessage}</Alert> :
                        null
                }

                email: <input type="text" name="email" onChange={this.handleChange} value={this.state.email} />
                password: <input type="password" name="password" onChange={this.handleChange} value={this.state.password} />
                <Button onClick={() => this.submit(this.state.email, this.state.password)}>Login</Button>
            </BaseLayout>
        )
    }

    componentDidMount = () => {
        // UserService.isTokenValid().then(isValid => {
        //     if (isValid) {
        //         window.location = "/"
        //     }
        // })
    }

}