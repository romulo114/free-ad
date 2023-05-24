import mongoose from 'mongoose'

const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const CitySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
})

module.exports =
    mongoose.models.City || mongoose.model('City', CitySchema, 'City', { overwriteModels: true })
