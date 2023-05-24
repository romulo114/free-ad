import { ObjectId } from 'mongodb'
import dbConnect from '../../../lib/mongodb'
import Street from '../../../models/Street'

async function handler(req, res) {
    await dbConnect()
    try {
        const method = await req.method
        const allstreets = await Street.find({})
        switch (method) {
            case 'GET':
                res.status(200).json({ success: true, message: '', data: allstreets })
                return
            case 'POST':
                const { street } = req.body
                const exist = await Street.find({ name: street })
                if (exist.length) {
                    res.status(200).json({
                        success: false,
                        message: `${street} already exist in the database`,
                    })
                    return
                } else {
                    try {
                        await Street.insertMany({
                            name: street,
                        })
                    } catch (err) {
                        res.status(403).json({ success: false, message: err.message })
                        return
                    }
                    res.status(200).json({
                        success: true,
                        message: 'successfully added',
                    })
                    return
                }
            case 'PUT':
                const { name, recordId } = req.body
                try {
                    const cities = await Street.updateOne(
                        { _id: ObjectId(recordId) },
                        { $set: { name: name } },
                    )
                    if (cities.modifiedCount === 1) {
                        res.status(200).json({
                            success: true,
                            message: 'successfully updated',
                        })
                        return
                    }
                } catch (err) {
                    res.status(400).json({
                        success: false,
                        message: `can\'t update street. ${err.message}`,
                    })
                    return
                }
            case 'DELETE':
                const { id } = req.body
                if (!id) {
                    res.status(200).json({
                        success: false,
                        message:
                            'Bad request for delete street. Please confirm again what you want to delete.',
                    })
                    return
                }
                try {
                    const rep = await Street.deleteOne({ _id: ObjectId(id) })
                    if (rep.deletedCount === 1) {
                        res.status(200).json({ success: true, message: 'Successfully deleted' })
                        return
                    } else {
                        res.status(400).json({ success: false, message: 'Failed on deleting' })
                        return
                    }
                } catch (err) {
                    res.status(400).json({
                        success: false,
                        message: `An err occured on Server while deleting. ${err.message}`,
                    })
                }
            default:
                res.status(404).json({ success: false, message: "Can't accept request" })
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
