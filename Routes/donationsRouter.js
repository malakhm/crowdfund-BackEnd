
import express from 'express';
import DonorController from '../Controllers/donationsController.js'; 
import Verification from '../Middleware/jwt.js'
const donationsRouter = express.Router();

// Route for getting all donations
donationsRouter.get('/',Verification.verifyLogin, DonorController.getAllDonations);

// Route for creating a new donation
donationsRouter.post('/', Verification.verifyDonor,DonorController.createDonation);

// Route for getting a donation by ID
donationsRouter.get('/:id',Verification.verifyLogin, DonorController.getDonationById);

// Route for getting donation amount by ID
donationsRouter.get('/amount/:id',Verification.verifyLogin, DonorController.getDonationAmountById);

// Route for getting donations by donor ID
donationsRouter.get('/donor/:requested_donor_id',Verification.verifyDonor, DonorController.getDonationByDonorID);

// Route for getting donations by campaign ID
donationsRouter.get('/campaign/:requested_campaign_id',Verification.verifyLogin, DonorController.getDonationByCampaignID);

// Route for updating a donation by ID
donationsRouter.put('/:id', Verification.verifyAdmin,DonorController.updateDonation);

donationsRouter.get('/donation/sum/:id', Verification.verifyDonor,DonorController.getSum)

// Export the router
export default donationsRouter;

