import Donation from '../Models/donationsModel.js';
import Campaign from '../Models/campaignsModel.js';
import User from '../Models/usersModel.js';
class DonorController{
  // Get all donations
static async getAllDonations (req, res) {
  try {
    const allDonations = await Donation.findAll({include: [Campaign, User]});
    return res.status(200).json({
      data: allDonations,
      status: 200,
      success: true,
      message: 'Retrieved all donations successfully',
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't retrieve donations due to server error: ${error}`,
    });
  }
};

// Create a donation
static async createDonation (req, res)  {
  try {
    const newDonation = await Donation.create(req.body);
    return res.status(200).json({
      data: newDonation,
      status: 200,
      success: true,
      message: 'Donation created successfully',
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't create donation due to server error: ${error}`,
    });
  }
};

// Get donation by ID
static async getDonationById (req, res)  {
  const { id } = req.params;
  try {
    const donation = await Donation.findByPk(id, {include: [Campaign, User]});
    if (!donation) {
      return res.status(404).json({
        data: null,
        status: 404,
        success: false,
        message: 'Donation not found',
      });
    }
    return res.status(200).json({
      data: donation,
      status: 200,
      success: true,
      message: 'Retrieved donation by ID successfully',
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't retrieve donation due to server error: ${error}`,
    });
  }
};

// Get donation amount by   ID
static async getDonationAmountById  (req, res) {
  const { id } = req.params;
  try {
    const donation = await Donation.findByPk(id, {include: [Campaign, User]});
    if (!donation) {
      return res.status(404).json({
        data: null,
        status: 404,
        success: false,
        message: 'Donation not found',
      });
    }
    return res.status(200).json({
      data: donation.amount,
      status: 200,
      success: true,
      message: 'Retrieved donation amount by ID successfully',
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't retrieve donation due to server error: ${error}`,
    });
  }
};

// Get donation By Donor ID
static async  getDonationByDonorID  (req, res)  {
  const { requested_donor_id } = req.params;
  try {
    const donation = await Donation.findAll({ 
      where:{userId: requested_donor_id}
    });
    if (!donation) {
      return res.status(404).json({
        data: null,
        status: 404,
        success: false,
        message: 'Donation not found',
      });
    }
    return res.status(200).json({
      data: donation,
      status: 200,
      success: true,
      message: 'Retrieved donation by Donor ID successfully',
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't retrieve donation due to server error: ${error}`, 
    });
  }
};


// Get donation Sum & Count By Donor ID --TO DO
static async getSum (req, res) {
  const { id } = req.params;
  

  try {
    const donation = await Donation.findAll({ 
      where:{userId: id},});
      let sum = 0 ;
      let count = 0

      for(let index=0; index < donation.length; index++)
      {
        sum += donation[index].amount;
        count = index
        

      }
      res.status(200).json(`sum is : $${sum} and count is : ${count}`);

    
  }
  catch (err){
    res.status(500).json({error: err})
  }
}


//Get donation By campaign ID
static async  getDonationByCampaignID  (req, res)  {
  const { requested_campaign_id } = req.params;
  try {
    const donation = await Donation.findAll({ 
      where:{campaign_id: requested_campaign_id}
    });
    if (!donation) {
      return res.status(404).json({
        data: null,
        status: 404,
        success: false,
        message: 'Donation not found',
      });
    }
    return res.status(200).json({
      data: donation,
      status: 200,
      success: true,
      message: 'Retrieved donation by Donor ID successfully',
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't retrieve donation due to server error: ${error}`, 
    });
  }
};


// Update a donation by ID
static async  updateDonation  (req, res)  {
  const { id } = req.params;
  try {
    const [updated] = await Donation.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedDonation = await Donation.findByPk(id);
      return res.status(200).json({
        data: updatedDonation,
        status: 200,
        success: true,
        message: 'Donation updated successfully',
      });
    }
    return res.status(404).json({
      data: null,
      status: 404,
      success: false,
      message: 'Donation not found',
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't update donation due to server error: ${error}`,
    });
  }
};


}

export default DonorController
  