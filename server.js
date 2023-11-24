import dotenv from 'dotenv'
import express  from 'express'
import cors from 'cors'
import sequelize from './Config/con.js'
import campaignRouter from './Routes/campaignsRouter.js'

dotenv.config()

// initialize express app

const app = express()

// middleware

app.use("/api/campaignRoute", campaignRouter)
app.use(express.json())
app.use(cors())


// routers
// app.use('/api/products', productRouter)


// port
const PORT = process.env.PORT || 8090;


// server
app.listen(PORT, ()=>{
    console.log(`server is running on port: ${PORT}`)
})


app.use('/api/users',userRouter)