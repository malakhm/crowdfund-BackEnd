import adminController from '../Controllers/adminController.js'
import express from 'express'
import Verification from '../Middleware/jwt.js';
const adminRouter = express.Router();

adminRouter.post('/', Verification.verifyAdmin,adminController.createAdmin);


adminRouter.get('/', Verification.verifyAdmin,adminController.findallAdmins);

adminRouter.get('/:id', Verification.verifyAdmin,adminController.findAdminByPk);

adminRouter.delete('/:id', Verification.verifyAdmin,adminController.deleteAdmin);

adminRouter.put('/:id', Verification.verifyAdmin,adminController.updateAdmin)



export default adminRouter;
