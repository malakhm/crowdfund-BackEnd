
import express from 'express';
import adminController from '../Controllers/adminController.js';

const adminAuthRouter = express.Router()



adminAuthRouter.post('/signin',adminController.SignIn);

export default adminAuthRouter