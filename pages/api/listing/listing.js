import { ObjectId } from 'mongodb'
import dbConnect from '../../../lib/mongodb'
import Listing from '../../../models/Listings'

async function handler(req, res) {
    await dbConnect()
    try {
        const method = await req.method
        const allListings = await Listing.find({})
                res.status(200).json({ success: true, message: '', data: allListings })
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

export default handler
