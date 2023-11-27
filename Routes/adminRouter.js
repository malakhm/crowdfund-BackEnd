import adminController from '../Controllers/adminController.js'
import express from 'express'

const adminRouter = express.Router();

adminRouter.post('/', adminController.createAdmin);
adminRouter.post('/signin', adminController.SignIn);

adminRouter.get('/', adminController.findallAdmins);

adminRouter.get('/:id', adminController.findAdminByPk);

adminRouter.delete('/:id', adminController.deleteAdmin);

adminRouter.put('/:id', adminController.updateAdmin)



export default adminRouter;
