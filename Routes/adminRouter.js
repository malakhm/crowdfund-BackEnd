import adminController from '../Controllers/adminController.js'
import express from 'express'
import Verification from '../Middleware/jwt.js';
const adminRouter = express.Router();

adminRouter.post('/', adminController.createAdmin);


adminRouter.get('/', adminController.findallAdmins);

adminRouter.get('/:id', adminController.findAdminByPk);

adminRouter.delete('/:id', adminController.deleteAdmin);

adminRouter.put('/:id', adminController.updateAdmin)



export default adminRouter;
