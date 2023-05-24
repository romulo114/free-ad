import mongoose from 'mongoose'

const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const ServiceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
})

module.exports =
    mongoose.models.Service ||
    mongoose.model('Service', ServiceSchema, 'Service', { overwriteModels: true })
