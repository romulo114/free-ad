import mongoose from 'mongoose'

const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const AnnouncementSchema = new Schema({
    name: String,
    active: Boolean,
})

module.exports =
    mongoose.models.Announcement ||
    mongoose.model('Announcement', AnnouncementSchema, 'Announcement', { overwriteModels: true })
