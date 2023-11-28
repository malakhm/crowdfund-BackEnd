import dotenv from 'dotenv'
import express  from 'express'
import cors from 'cors'
import sequelize from './Config/connection.js'
import campaignRouter from './Routes/campaignsRouter.js'
import donationsRouter from './Routes/donationsRouter.js'
import authRouter from './Routes/auth.js'
import userRouter from './Routes/usersRouter.js'
import adminRouter from './Routes/adminRouter.js'
import bodyParser from 'body-parser'
import adminAuthRouter from './Routes/adminAuth.js'
import Verification from './Middleware/jwt.js'
dotenv.config()
 
// initialize express app

const app = express()

// middleware


app.use(express.json())
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true}));


// routers
app.use('/api/users',Verification.verifyAdmin,userRouter)
app.use('/api/donationRoute',Verification.verifyDonor, donationsRouter)
app.use("/admin",Verification.verifyAdmin, adminRouter)
app.use("/api/campaignRoute", Verification.verifyCreator,campaignRouter)
app.use("/api/auth", authRouter)
app.use("/api/admin/auth", adminAuthRouter)
// port
const PORT = process.env.PORT || 8090;


// server
app.listen(PORT, ()=>{
    console.log(`server is running on port: ${PORT}`)
})


