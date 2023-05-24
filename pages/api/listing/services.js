import { ObjectId } from 'mongodb'
import dbConnect from '../../../lib/mongodb'
import Listing from '../../../models/Listings'

async function handler(req, res) {
    await dbConnect()
    try {
        const method = await req.method
        switch (method) {
            case 'POST':
                const { services, listingId } = req.body

                try {
                    const savedListing = await Listing.updateOne(
                        { _id: ObjectId(listingId) },
                        {
                            services: services,
                        },
                    )

                    res.status(200).json({
                        success: true,
                        message: 'Add Services Successfully',
                        data: savedListing._id,
                    })
                    return
                } catch (err) {
                    res.status(400).json({
                        success: false,
                        message: "Can't Add Services",
                        data: err.message,
                    })
                    return
                }
            default:
                res.status(404).json({
                    success: false,
                    message: `Unexpected request: Can't handle the request for saving an user. ${err.message} `,
                })
                return
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

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb',
        },
    },
}

export default handler
