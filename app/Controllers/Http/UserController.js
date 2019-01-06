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

            return await auth.generate(user)
        } catch (error) {
            return { error: error.code }
        }
    }

    async login({ request, auth }) {
        try {
            const { email, password } = request.all()
            return await auth.attempt(email, password)
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
