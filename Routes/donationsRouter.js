
import express from 'express';
import DonorController from '../Controllers/donationsController.js'; 
import Verification from '../Middleware/jwt.js'
const donationsRouter = express.Router();

// Route for getting all donations
donationsRouter.get('/', DonorController.getAllDonations); //Verification.verifyLogin, 

// Route for creating a new donation
donationsRouter.post('/', DonorController.createDonation);

// Route for getting a donation by ID
donationsRouter.get('/:id', DonorController.getDonationById); //Verification.verifyLogin,

// Route for getting donation amount by ID
donationsRouter.get('/amount/:id',DonorController.getDonationAmountById); //Verification.verifyLogin, 

// Route for getting donations by donor ID
donationsRouter.get('/donor/:requested_donor_id',DonorController.getDonationByDonorID); //Verification.verifyDonor, 


// Route for getting donations by campaign ID
donationsRouter.get('/campaign/:requested_campaign_id', DonorController.getDonationByCampaignID); //Verification.verifyLogin, 

// Route for updating a donation by ID
donationsRouter.put('/:id', DonorController.updateDonation); //Verification.verifyAdmin,

donationsRouter.get('/donation/sum/:id', DonorController.getSum) //Verification.verifyDonor,

// Export the router
export default donationsRouter;
