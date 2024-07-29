import mongoose from 'mongoose'
import dotenv from 'dotenv'


const connectToMongoDB = async () => {

    try {
        await mongoose.connect( process.env.MONGO_URI )
        console.log('MongoDB connected')
    } catch (error) {
        console.log("Failed to connect to MongoDB\n",error.errorResponse.errmsg)
    }
}


export default connectToMongoDB

