import mongoose from 'mongoose'

const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const AreaSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
})

module.exports =
    mongoose.models.Area || mongoose.model('Area', AreaSchema, 'Area', { overwriteModels: true })
