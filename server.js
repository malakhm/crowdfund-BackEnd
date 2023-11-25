import dotenv from 'dotenv'
import express  from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
// import sequelize from './Config/connection.js'
import campaignRouter from './Routes/campaignsRouter.js'
import donationsRouter from './Routes/donationsRouter.js'
import userRouter from './Routes/usersRouter.js'


dotenv.config()

// initialize express app
const app = express()

// middleware
app.use(express.json())
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// routers
app.use("/api/campaignRoute", campaignRouter)
app.use('/api/donationRoute', donationsRouter)

// port
const PORT = process.env.PORT || 8090;

// server
app.listen(PORT, ()=>{
    console.log(`server is running on port: ${PORT}`)
})

app.use('/api/users',userRouter)