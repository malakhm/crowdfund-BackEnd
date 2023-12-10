import express from 'express';
import usersController from '../Controllers/usersController.js'
import Verification from '../Middleware/jwt.js';
// import UsersController from '../Controllers/usersController.js';

const userRouter = express.Router()
userRouter.get('/', Verification.verifyAdmin,usersController.getAllUsers); // get all users 
userRouter.post('/',usersController.createUser); // create user
userRouter.get('/:id',usersController.getOneUser);// get user by id
userRouter.put('/:id', Verification.verifyLogin,usersController.editUser); // update user 
userRouter.delete('/:id',Verification.verifyAdmin, usersController.deleteUser);// delete user 
userRouter.get('/getbyusername/:username', Verification.verifyLogin,usersController.getByUsername); // get user by username 
userRouter.get('/getDonors/data',Verification.verifyLogin, usersController.getDonors); // get all accepted Donors 
userRouter.get('/getCreators/data',Verification.verifyLogin, usersController.getCreators);// get all accepted Creators 
userRouter.get('/getPending/request', Verification.verifyAdmin,usersController.getPending); // get pending requests 
userRouter.put('/accept/:id', Verification.verifyAdmin,usersController.acceptUser);


export default userRouter