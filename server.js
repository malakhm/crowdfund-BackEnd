import dotenv from 'dotenv'
import  express  from 'express'
import cors from 'cors'
import adminRouter from './Routes/adminRouter.js'
dotenv.config()

// initialize express app

const app = express()

// middleware

app.use(express.json())
app.use(cors())
app.use("/admin" , adminRouter)


// routers
// app.use('/api/products', productRouter)


// port
const PORT = process.env.PORT || 8090;


// server
app.listen(PORT, ()=>{
    console.log(`server is running on port: ${PORT}`)
})

