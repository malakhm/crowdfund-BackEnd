import dotenv from 'dotenv'
import express  from 'express'
import cors from 'cors'
import sequelize from './Config/con'
import campaignRouter from './Routes/campaignsRouter'

dotenv.config()

sequelize.sync({alter: true}) //Be carefull when editing a model, it might add a new one while keeping the old table

// initialize express app

const app = express()

// middleware

app.use("/campaignRoute", campaignRouter)
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

