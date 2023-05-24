import { ObjectId } from 'mongodb'
import dbConnect from '../../../lib/mongodb'
import Listing from '../../../models/Listings'

async function handler(req, res) {
    await dbConnect()
    try {
        const method = await req.method
        switch (method) {
            case 'POST':
                const {
                    nationality,
                    i_speak,
                    orientation,
                    i_meet,
                    available_for,
                    height,
                    weight,
                    cup_size,
                    b_type,
                    p_length,
                    p_girth,
                    hair_color,
                    eye_color,
                    intimate_hair,
                    bodyart,
                    smoking,
                    drinking,
                    party_play,
                    listingId,
                } = req.body
                try {
                    const savedListing = await Listing.updateOne(
                        { _id: ObjectId(listingId) },
                        {
                            nationality,
                            i_speak,
                            orientation,
                            i_meet,
                            available_for,
                            height,
                            weight,
                            cup_size,
                            b_type,
                            p_length,
                            p_girth,
                            hair_color,
                            eye_color,
                            intimate_hair,
                            bodyart,
                            smoking,
                            drinking,
                            party_play,
                        },
                    )

                    // if ((savedListing.matchedCount === savedListing.modifiedCount) === 1) {
                    res.status(200).json({
                        success: true,
                        message: 'Add characteristics Successfully',
                        data: savedListing._id,
                    })
                    return
                    // } else {
                    //     res.status(404).json({
                    //         success: false,
                    //         message: "can't find basic detail information",
                    //     })
                    //     return
                    // }
                } catch (err) {
                    res.status(400).json({
                        success: false,
                        message: "can't add characteristics",
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
export default handler
