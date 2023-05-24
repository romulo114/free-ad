import mongoose from 'mongoose'

const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const AnnouncementSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },

    consent: {
        type: String,
        required: true,
    },
    limit: {
        type: Number,
        default: '1',
    },
    active: {
        type: Boolean,
        default: true,
    },
    dateofbirth: {
        type: String,
    },
})

module.exports =
    mongoose.models.Account ||
    mongoose.model('Account', AnnouncementSchema, 'Account', { overwriteModels: true })
