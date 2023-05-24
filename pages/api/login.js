import dbConnect from '../../lib/mongodb'
import User from '../../models/User'

import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'

async function handler(req, res) {
    await dbConnect()
    try {
        const { username, password } = req.body
        try {
            const oneUser = await User.find({ username: username })
            if (!oneUser.length) {
                res.status(200).json({ success: false, message: 'Invalid credentials' })
                return
            } else {
                if (oneUser[0].password !== password) {
                    res.status(200).json({ success: false, message: 'Invalid Password' })
                    return
                }
            }
        } catch (err) {
            res.status(400).json({ success: false, message: `can't find User with ${username}` })
        }

        const user = { isLoggedIn: true }
        req.session.user = user
        try {
            await req.session.save()
        } catch (err) {
            res.status(403).json({ success: false, message: 'error on finding User' })
        }
        res.json({
            success: true,
            message: 'successfully signed in',
            user,
        })
        return
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Can't connect the server",
            data: error.message,
        })
        return
    }
}

export default withIronSessionApiRoute(handler, sessionOptions)
