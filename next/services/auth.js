import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import apiUrl from './apiUrl'

import { getCookieFromReq } from '../helpers/utils';

class Auth {

    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout() {
        try {
            Cookies.remove('jwt');
            Cookies.remove('user');

            //TODO server logout
            return true;
        } catch (error) {
            return false;
        }
    }

    async login(email, password) {
        const response = await axios.post(`${apiUrl}/api/login`, { email, password })
        const data = response.data

        //An error occured
        if (data.error) {
            return { error: data.error }
        }
        else {
            Cookies.set('jwt', data.jwt.token)
            Cookies.set('user', JSON.stringify(data.user))
            return data
        }
    }

    async register(username, email, password) {
        try {
            const response = await axios.post(`${apiUrl}/api/register`, { username, email, password })
            const data = response.data

            //An error occured
            if (data.error) {
                return { error: data.error }
            }
            else {
                Cookies.set('jwt', data.jwt.token)
                Cookies.set('user', JSON.stringify(data.user))
                return data
            }
        } catch (error) {
            return {error}
        }
    }

    async verifyToken(token) {
        if (token) {
            const decodedToken = jwt.decode(token, { complete: true });

            if (!decodedToken) { return undefined; }

            try {
                const verifiedToken = await axios.post(`${apiUrl}/api/verifyToken`, {}, { headers: { Authorization: `Bearer ${token}` } })
                if (verifiedToken.data === true) {
                    return true;

                    //TODO verify expiration
                    //const expiresAt = verifiedToken.exp * 1000;
                    //return (verifiedToken && new Date().getTime() < expiresAt) ? verifiedToken : undefined;
                }

            } catch (err) {
                console.log(err)
                return undefined;
            }
        }

        return undefined;
    }


    async clientAuth() {
        const token = Cookies.getJSON('jwt');
        const isValid = await this.verifyToken(token);
        if (isValid) {
            return Cookies.getJSON('user');
        }
        return undefined;
    }


    async serverAuth(req) {
        if (req.headers.cookie) {

            const token = getCookieFromReq(req, 'jwt');
            const isValid = await this.verifyToken(token);

            if (isValid) {
                return JSON.parse(decodeURIComponent(getCookieFromReq(req, 'user')));
            }
        }

        return undefined;
    }
}


const authClient = new Auth();

export default authClient;