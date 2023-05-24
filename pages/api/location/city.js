import { ObjectId } from 'mongodb'
import dbConnect from '../../../lib/mongodb'
import City from '../../../models/City'

async function handler(req, res) {
    await dbConnect()
    try {
        const method = await req.method
        const allCities = await City.find({})
        switch (method) {
            case 'GET':
                res.status(200).json({ success: true, message: '', data: allCities })
                return
            case 'POST':
                const { city } = req.body
                const exist = await City.find({ name: city })
                if (exist.length) {
                    res.status(200).json({
                        success: false,
                        message: `${city} already exist in the database`,
                    })
                    return
                } else {
                    try {
                        await City.insertMany({
                            name: city,
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
                    const cities = await City.updateOne(
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
                        message: `can\'t update city. ${err.message}`,
                    })
                    return
                }
            case 'DELETE':
                const { id } = req.body
                if (!id) {
                    res.status(200).json({
                        success: false,
                        message:
                            'Bad request for delete city. Please confirm again what you want to delete.',
                    })
                    return
                }
                try {
                    const rep = await City.deleteOne({ _id: ObjectId(id) })
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
