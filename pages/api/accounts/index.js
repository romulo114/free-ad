import { ObjectId } from 'mongodb'
import dbConnect from '../../../lib/mongodb'
import Account from '../../../models/Account'
import bcrypt from 'bcryptjs'

async function handler(req, res) {
    await dbConnect()
    try {
        const method = await req.method
        switch (method) {
            case 'POST':
                const {
                    email,
                    password,
                    role,
                    name,
                    surname,
                    limit,
                    consent,
                    accountStatus,
                    birthday,
                } = req.body
                try {
                    const oneUser = await Account.find({ username: email })
                    if (role === 'individual' && limit > 1) {
                        res.status(200).json({
                            success: false,
                            message: "Individual's post limit can't be more than 1",
                        })
                        return
                    }
                    if (oneUser.length) {
                        res.status(200).json({
                            success: false,
                            message: "There's an user with the same email",
                        })
                        return
                    } else {
                        try {
                            await Account.insertMany({
                                username: email,
                                password: bcrypt.hashSync(password, 8),
                                role: role,
                                name: name,
                                surname: surname,
                                limit: limit,
                                consent: consent,
                                active: accountStatus === 'active' ? true : false,
                                birthday: birthday,
                            })
                        } catch (err) {
                            res.status(404).json({
                                success: false,
                                message: `There was an error when saving the user information. ${err.message}`,
                            })
                            return
                        }
                        res.status(200).json({ success: true, message: 'Add user Successfully' })
                        return
                    }
                } catch (err) {
                    res.status(400).json({ success: false, message: "can't add user" })
                }
            default:
                res.status(404).json({
                    success: false,
                    message: `Unexpected request: Can't handle the request for saving an user. ${err.message} `,
                })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Can't connect the server",
            data: error.message,
        })
        return
    }
}

export default handler
