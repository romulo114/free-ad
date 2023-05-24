import mongoose from 'mongoose'

const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const UserSchema = new Schema({
    username: String,
    password: String,
})

module.exports =
    mongoose.models.Users || mongoose.model('Users', UserSchema, 'Users', { overwriteModels: true })
