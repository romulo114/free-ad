import mongoose from 'mongoose'

const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
})

module.exports =
    mongoose.models.Category ||
    mongoose.model('Category', CategorySchema, 'Category', { overwriteModels: true })
