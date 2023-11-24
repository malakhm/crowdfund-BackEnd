
import express from 'express';
import DonorController from './DonorController'; 

const donationsRouter = express.Router();

// Route for getting all donations
donationsRouter.get('/', DonorController.getAllDonations);

// Route for creating a new donation
donationsRouter.post('/', DonorController.createDonation);

// Route for getting a donation by ID
donationsRouter.get('/:id', DonorController.getDonationById);

// Route for getting donation amount by ID
donationsRouter.get('/:id/amount', DonorController.getDonationAmountById);

// Route for getting donations by donor ID
donationsRouter.get('/donor/:requested_donor_id', DonorController.getDonationByDonorID);

// Route for getting donations by campaign ID
donationsRouter.get('/campaign/:requested_campaign_id', DonorController.getDonationByCampaignID);

// Route for getting donations by both donor ID and campaign ID
donationsRouter.get('/donor/:requested_donor_id/campaign/:requested_campaign_id', DonorController.getDonationByBothID);

// Route for updating a donation by ID
donationsRouter.put('/:id', DonorController.updateDonation);

// Route for deleting a donation by ID
donationsRouter.delete('/:id', DonorController.deleteDonationById);

// Route for deleting all donations
donationsRouter.delete('/', DonorController.deleteAllDonations);

// Export the router
export default donationsRouter;

