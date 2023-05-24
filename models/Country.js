import mongoose from 'mongoose'

const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const CountrySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
})

module.exports =
    mongoose.models.Country ||
    mongoose.model('Country', CountrySchema, 'Country', { overwriteModels: true })
