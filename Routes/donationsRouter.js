
import express from 'express';
import DonorController from '../Controllers/donationsController.js'; 
import Verification from '../Middleware/jwt.js'
const donationsRouter = express.Router();

// Route for getting all donations
donationsRouter.get('/',DonorController.getAllDonations);

// Route for creating a new donation
donationsRouter.post('/', DonorController.createDonation);

// Route for getting a donation by ID
donationsRouter.get('/:id',DonorController.getDonationById);

// Route for getting donation amount by ID
donationsRouter.get('/amount/:id',DonorController.getDonationAmountById); 

// Route for getting donations by donor ID
donationsRouter.get('/donor/:requested_donor_id',DonorController.getDonationByDonorID); 


// Route for getting donations by campaign ID
donationsRouter.get('/campaign/:requested_campaign_id',DonorController.getDonationByCampaignID); 

// Route for updating a donation by ID
donationsRouter.put('/:id', DonorController.updateDonation);

donationsRouter.get('/donation/sum/:id',DonorController.getSum)

// Export the router
export default donationsRouter;
