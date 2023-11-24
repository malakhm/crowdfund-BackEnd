import express from 'express';
import usersController from '../Controllers/usersController.js'


const userRouter = express.Router()

userRouter.get('/', usersController.getAllUsers);
userRouter.post('/', usersController.createUser);
userRouter.get('/:id', usersController.getOneUser);
userRouter.put('/:id', usersController.editUser);
userRouter.delete('/:id', usersController.deleteUser);
userRouter.get('/getbyusername/:username', usersController.getByUsername);
userRouter.get('/getDonors', usersController.getDonors);
userRouter.get('/getCreators', usersController.getCreators);
userRouter.get('/getPending', usersController.getPending);
// userRouter.post('/', createUser);
export default userRouter