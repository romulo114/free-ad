import mongoose from 'mongoose'

const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const StreetSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
})

module.exports =
    mongoose.models.Street ||
    mongoose.model('Street', StreetSchema, 'Street', { overwriteModels: true })
