import express from 'express';
import usersController from '../Controllers/usersController.js'


const userRouter = express.Router()

userRouter.get('/', usersController.getAllUsers); // get all users
userRouter.post('/', usersController.createUser); // create user
userRouter.get('/:id', usersController.getOneUser);// get user by id
userRouter.put('/:id', usersController.editUser); // update user
userRouter.delete('/:id', usersController.deleteUser);// delete user
userRouter.get('/getbyusername/:username', usersController.getByUsername); // get user by username
userRouter.get('/getDonors/data', usersController.getDonors); // get all accepted Donors
userRouter.get('/getCreators/data', usersController.getCreators);// get all accepted Creators
userRouter.get('/getPending/request', usersController.getPending); // get pending requests
userRouter.put('/accept/:id', usersController.acceptUser)
export default userRouter