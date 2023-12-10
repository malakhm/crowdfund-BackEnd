import express from 'express';
import authController from '../Controllers/authController.js';
import Verification from '../Middleware/jwt.js'

const authRouter = express.Router()



authRouter.post('/signin',authController.handleLogin)

export default authRouter