'use strict'

const User = use('App/Models/User')

class UserController {

    async register({ request, auth }) {
        try {
            const { username, email, password } = request.all()
            const user = await User.create({
                email,
                password,
                username,
            })

            let jwt = await auth.generate(user)
            let user = await User.query().where('email', email).fetch()
            return {
                jwt,
                user: {
                    id: user.id,
                    username: user.username
                }
            }
        } catch (error) {
            return { error: error.code }
        }
    }

    async login({ request, auth }) {
        try {
            const { email, password } = request.all()
            let jwt = await auth.attempt(email, password)
            let user = await User.query().where('email', email).first()
            return {
                jwt,
                user: {
                    id: user.id,
                    username: user.username
                }
            }
        } catch (error) {
            return { error: error.code }
        }
    }

    async verifyToken({ auth }) {
        try {
            await auth.check()
            return true
        } catch (error) {
            return false
        }
    }
}

module.exports = UserController
