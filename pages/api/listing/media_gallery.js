import { ObjectId } from 'mongodb'
import dbConnect from '../../../lib/mongodb'
import Listing from '../../../models/Listings'

async function handler(req, res) {
    await dbConnect()
    try {
        const method = await req.method
        switch (method) {
            case 'POST':
                const { listingPicture, thumbnails, listingId } = JSON.parse(req.body)
                if (!thumbnails) {
                    res.status(200).json({
                        success: true,
                        message: '',
                        data: listingId,
                    })
                    return
                }
                let titles = thumbnails.map((item) => item.data_url)

                try {
                    const savedListing = await Listing.updateOne(
                        { _id: ObjectId(listingId) },
                        {
                            listingPicture: listingPicture.data_url,
                            thumbnails: titles,
                        },
                    )

                    res.status(200).json({
                        success: true,
                        message: 'Add media gallery Successfully',
                        data: savedListing._id,
                    })
                    return
                } catch (err) {
                    res.status(400).json({
                        success: false,
                        message: "can't add media gallery",
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
