import mongoose from 'mongoose'

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
        }

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose
        })
    }
    try {
        cached.conn = await cached.promise
        console.log('db connected Successfully')
        return cached.conn
    } catch (err) {
        throw new Error(err)
    }
}

export default dbConnect
