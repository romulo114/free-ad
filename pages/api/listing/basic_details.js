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
                    listingName,
                    age,
                    gender,
                    code,
                    listingPicture,
                    aboutMe,
                    contactMethods,
                    locationCountry,
                    locationCity,
                } = JSON.parse(req.body)

                try {
                    const oneListing = await Listing.find({ listingName: listingName })
                    if (oneListing.length) {
                        res.status(200).json({
                            success: false,
                            message: 'This listing is already existed.',
                        })
                        return
                    } else {
                        try {
                            const savedListing = await Listing.insertMany({
                                listingName,
                                age,
                                gender,
                                code,
                                listingPicture: listingPicture.data_url,
                                aboutMe,
                                contactMethods,
                                locationCountry,
                                locationCity,
                                nationality: '',
                                i_speak: '',
                                orientation: '',
                                i_meet: '',
                                available_for: '',
                                height: '',
                                weight: '',
                                cup_size: '',
                                b_type: '',
                                p_length: '',
                                p_girth: '',
                                hair_color: '',
                                eye_color: '',
                                intimate_hair: '',
                                body_art: '',
                                smoking: '',
                                drinking: '',
                                party_play: '',
                                thumbnails: '',
                                services: {},
                                availability: {},
                            })
                            res.status(200).json({
                                success: true,
                                message: 'Add basic details Successfully',
                                data: savedListing[0]._id,
                            })
                            return
                        } catch (err) {
                            res.status(400).json({
                                success: false,
                                message: `There was an error when saving the listing information. ${err.message}`,
                            })
                            return
                        }
                    }
                } catch (err) {
                    res.status(400).json({ success: false, message: "can't add listing" })
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
