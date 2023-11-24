import dotenv from 'dotenv'
import  express  from 'express'
import cors from 'cors'
dotenv.config()
import userRouter from './Routes/usersRouter.js'
import sequelize from './Config/connection.js'
sequelize.sync();
// initialize express app

const app = express()

// middleware

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