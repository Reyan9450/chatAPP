import mongoose from 'mongoose'
import dotenv from 'dotenv'


const connectToMongoDB = async () => {

    try {
        await mongoose.connect( "mongodb://127.0.0.1:27017/chatAPP")
        console.log('MongoDB connected')
    } catch (error) {
        console.log("Failed to connect to MongoDB\n",error.errorResponse.errmsg)
    }
}

export default connectToMongoDB

