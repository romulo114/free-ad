import { ObjectId } from 'mongodb'
import dbConnect from '../../lib/mongodb'
import Announcement from '../../models/Announcement'

async function handler(req, res) {
    await dbConnect()
    try {
        const method = await req.method
        const allAnnouncements = await Announcement.find({})
        switch (method) {
            case 'GET':
                res.status(200).json({ success: true, message: '', data: allAnnouncements })
                return
            case 'POST':
                const { announcement } = req.body
                const exist = await Announcement.find({ name: announcement })
                if (exist.length) {
                    res.status(200).json({
                        success: false,
                        message: `${announcement} already exist in the database`,
                    })
                    return
                } else {
                    try {
                        await Announcement.insertMany({
                            name: announcement,
                            active: false,
                        })
                    } catch (err) {
                        res.status(403).json({ success: false, message: err.message })
                        return
                    }
                    res.status(200).json({
                        success: true,
                        message: 'successfully added',
                        data: allAnnouncements,
                    })
                    return
                }
            case 'PUT':
                const { name, recordId } = req.body
                try {
                    const announcements = await Announcement.updateOne(
                        { _id: ObjectId(recordId) },
                        { $set: { name: name } },
                    )
                    if (announcements.modifiedCount === 1) {
                        res.status(200).json({
                            success: true,
                            message: 'successfully updated',
                            data: allAnnouncements,
                        })
                        return
                    }
                } catch (err) {
                    res.status(400).json({
                        success: false,
                        message: `can\'t update announcement. ${err.message}`,
                    })
                    return
                }
            case 'DELETE':
                const { id } = req.body
                if (!id) {
                    res.status(200).json({
                        success: false,
                        message:
                            'Bad request for delete announcement. Please confirm what you want to delete.',
                    })
                    return
                }
                try {
                    const rep = await Announcement.deleteOne({ _id: ObjectId(id) })
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
