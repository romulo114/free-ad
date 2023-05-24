import { ObjectId } from 'mongodb'
import dbConnect from '../../../lib/mongodb'
//import Listing from '@/models/listing'

async function handler(req, res) {
    await dbConnect()
    try {
        const method = await req.method
        switch (method) {
            case 'POST':
                const { values } = req.body
                // console.log(
                //     'listingName, age, gender, code, aboutMe, locationCountry, locationCity, mapWithLocation,contactMethods,  nationality, i_speak, orientation, i_meet,available_for, height,weight,cup_size, breast_type, penis_length, penis_girth,hair_color, eye_color, intimate_hair,bodyart,smoking, drinking, party_play ===>',
                //     listingName,
                //     age,
                //     gender,
                //     code,
                //     aboutMe,
                //     locationCountry,
                //     locationCity,
                //     mapWithLocation,
                //     contactMethods,
                //
                //     nationality,
                //     i_speak,
                //     orientation,
                //     i_meet,
                //     available_for,
                //     height,
                //     weight,
                //     cup_size,
                //     breast_type,
                //     penis_length,
                //     penis_girth,
                //     hair_color,
                //     eye_color,
                //     intimate_hair,
                //     bodyart,
                //     smoking,
                //     drinking,
                //     party_play,
                // )
                // try {
                // const oneUser = await Listing.find({ code: code })

                // if (oneUser.length) {
                //     res.status(200).json({
                //         success: false,
                //         message: 'This listing is already existed.',
                //     })
                //     return
                // } else {
                try {
                    res.status(200).json({ success: true, message: 'success' })
                    return
                    // await Listing.insertMany({
                    // listingName,
                    // age,
                    // gender,
                    // code,
                    // aboutMe,
                    // locationCountry,
                    // locationCity,
                    // mapWithLocation,
                    // contactMethods,
                    // nationality,
                    // i_speak,
                    // orientation,
                    // i_meet,
                    // available_for,
                    // height,
                    // weight,
                    // cup_size,
                    // breast_type,
                    // penis_length,
                    // penis_girth,
                    // hair_color,
                    // eye_color,
                    // intimate_hair,
                    // bodyart,
                    // smoking,
                    // drinking,
                    // party_play,
                    // })
                } catch (err) {
                    res.status(400).json({
                        success: false,
                        message: `There was an error when saving the listing information. ${err.message}`,
                    })
                    return
                }
                res.status(200).json({ success: true, message: 'Add listing Successfully' })
                return
        }
        // } catch (err) {
        //     res.status(400).json({ success: false, message: "can't add listing" })
        // }
        // default:
        //     res.status(404).json({
        //         success: false,
        //         message: `Unexpected request: Can't handle the request for saving an listing. ${err.message} `,
        //     })
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
