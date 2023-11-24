import Donation from '../Models/donationsModel';

class DonorController{
  // Get all donations
static async getAllDonations (req, res) {
  try {
    const allDonations = await Donation.findAll();
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
    return res.status(201).json({
      data: newDonation,
      status: 201,
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
    const donation = await Donation.findByPk(id);
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

// Get donation by  amount ID
static async getDonationAmountById  (req, res) {
  const { id } = req.params;
  try {
    const donation = await Donation.findByPk(id);
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
      where:{donor_id: requested_donor_id}
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

// Get donation By  Both ID
static async  getDonationByBothID  (req, res)  {
  const { requested_donor_id } = req.params;
  const { requested_campaign_id } = req.params;
  try {
    const donation = await Donation.findAll({ 
      where:{campaign_id: requested_campaign_id,donor_id: requested_donor_id
  }});
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

// Delete a donation by ID
static async deleteDonationById (req, res)  {
  const { id } = req.params;
  try {
    const deleted = await Donation.destroy({
      where: { id },
    });
    if (deleted) {
      return res.status(200).json({
        data: null,
        status: 200,
        success: true,
        message: 'Donation deleted successfully',
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
      message: `Couldn't delete donation due to server error: ${error}`,
    });
  }
};

// Delete all donations
static async deleteAllDonations (req, res)  {
  try {
    await Donation.destroy({
      where: {},
      truncate: true,
    });
    return res.status(200).json({
      data: null,
      status: 200,
      success: true,
      message: 'All donations deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't delete all donations due to server error: ${error}`,
    });
  }
};


}

export default {DonorController}
  