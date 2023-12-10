import express from 'express';
import usersController from '../Controllers/usersController.js'
import Verification from '../Middleware/jwt.js';
import UsersController from '../Controllers/usersController.js';

const userRouter = express.Router()
userRouter.get('/', usersController.getAllUsers); // get all users Verification.verifyAdmin,
userRouter.post('/',usersController.createUser); // create user
userRouter.get('/:id',usersController.getOneUser);// get user by id
userRouter.put('/:id', usersController.editUser); // update user Verification.verifyLogin,
userRouter.delete('/:id', usersController.deleteUser);// delete user Verification.verifyAdmin,
userRouter.get('/getbyusername/:username', usersController.getByUsername); // get user by username Verification.verifyLogin,
userRouter.get('/getDonors/data', usersController.getDonors); // get all accepted Donors Verification.verifyLogin,
userRouter.get('/getCreators/data', usersController.getCreators);// get all accepted Creators Verification.verifyLogin,
userRouter.get('/getPending/request', usersController.getPending); // get pending requests Verification.verifyAdmin,
userRouter.put('/accept/:id', usersController.acceptUser) // Verification.verifyAdmin,


export default userRouter


