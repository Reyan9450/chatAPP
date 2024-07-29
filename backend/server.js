import express from 'express'
import path from 'path'
// import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './Routes/auth.routes.js'
import connectToMongoDB from './mongoDB/connectToMongoDB.js'
import messageRoutes from './Routes/message.routes.js'
import usersRoute from './Routes/users.routes.js'
import cookieParser from 'cookie-parser'
// import {server} from './socket/socket.js'
// import {app} from './socket/socket.js'
// import connectDB from './mongodb/connect.js'
// import postRoutes from './routes/postRoutes.js'
// import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config()

 const _dirname=path.resolve();

const PORT =process.env.PORT||5000;
const app = express()

//MiddleWares

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoutes)
app.use('/api/users',usersRoute)
app.use(express.static(path.join(_dirname,'frontend/dist')))

app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "frontend", "dist", "index.html"));
})

app.get('/', async(req,res) => {

    res.send('Hello from DALL-E!')

})



app.listen(PORT, () => {
    connectToMongoDB()
    console.log(`Server has started on port http://localhost:${PORT}`)
})