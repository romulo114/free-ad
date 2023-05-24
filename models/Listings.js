import mongoose from 'mongoose'

const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const ListingSchema = new Schema({
    listingName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    aboutMe: {
        type: String,
        required: true,
    },
    locationCountry: {
        type: String,
        required: true,
    },
    locationCity: {
        type: String,
        required: true,
    },
    mapWithLocation: {
        type: String,
        // required: true,
    },
    contactMethods: {
        type: [String],
        required: true,
    },
    listingPicture: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        // required: true,
    },
    i_speak: {
        type: String,
        // required: true,
    },
    orientation: {
        type: String,
        // required: true,
    },
    i_meet: {
        type: [String],
        // required: true,
    },
    available_for: {
        type: [String],
        // required: true,
    },
    height: {
        type: Number,
        // required: true,
    },
    weight: {
        type: Number,
        // required: true,
    },
    cup_size: {
        type: String,
        // required: true,
    },
    b_type: {
        type: String,
        // required: true,
    },
    p_length: {
        type: Number,
        // required: true,
    },
    p_girth: {
        type: Number,
        // required: true,
    },
    hair_color: {
        type: String,
        // required: true,
    },
    eye_color: {
        type: String,
        // required: true,
    },
    intimate_hair: {
        type: String,
        // required: true,
    },
    bodyart: {
        type: [String],
        // required: true,
    },
    smoking: {
        type: String,
        // required: true,
    },
    drinking: {
        type: String,
        // required: true,
    },
    party_play: {
        type: String,
        // required: true,
    },
    thumbnails: [String],
    services: [
        {
            title: {
                type: String,
            },
            serviceType: {
                type: String,
            },
            price: {
                type: String,
            },
        },
    ],
    availability: {
        workingHours: [
            {
                when: {
                    type: String,
                },
                active: {
                    type: Boolean,
                },
                from: {
                    type: String,
                },
                to: {
                    type: String,
                },
            },
        ],
        call: [
            {
                title: {
                    type: String,
                },
                availability: {
                    type: Boolean,
                },
                rate: {
                    duration: {
                        type: String,
                    },
                    price: {
                        type: Number,
                    },
                },
            },
        ],
    },
})

module.exports =
    mongoose.models.Listing ||
    mongoose.model('Listing', ListingSchema, 'Listing', { overwriteModels: true })
