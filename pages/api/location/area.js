import { ObjectId } from 'mongodb'
import dbConnect from '../../../lib/mongodb'
import Area from '../../../models/Area'

async function handler(req, res) {
    await dbConnect()
    try {
        const method = await req.method
        const allAreas = await Area.find({})
        switch (method) {
            case 'GET':
                res.status(200).json({ success: true, message: '', data: allAreas })
                return
            case 'POST':
                const { area } = req.body
                const exist = await Area.find({ name: area })
                if (exist.length) {
                    res.status(200).json({
                        success: false,
                        message: `${area} already exist in the database`,
                    })
                    return
                } else {
                    try {
                        await Area.insertMany({
                            name: area,
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
                    const cities = await Area.updateOne(
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
                        message: `can\'t update area. ${err.message}`,
                    })
                    return
                }
            case 'DELETE':
                const { id } = req.body
                if (!id) {
                    res.status(200).json({
                        success: false,
                        message:
                            'Bad request for delete area. Please confirm again what you want to delete.',
                    })
                    return
                }
                try {
                    const rep = await Area.deleteOne({ _id: ObjectId(id) })
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
