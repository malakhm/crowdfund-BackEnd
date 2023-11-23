import Campaign from "../Models/campaignsModel";

//Post a Campaign
const createCampaign = async (req, res) => {
  try { 
    const new_campaign = await Campaign.create(req.body);
    return res.status(201) //created
    .json({
      data: new_campaign.toJSON(), //used tojson() to show the data and not the instance details
      status: 201,
      success: true,
      message: "Campaign added"
    });
  } catch (error) {
    return res.status(500) //internal server error
    .json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't add the campaign due to server error: ${error}`,
    });
  }
}

//Get all campaigns
const getAllCampaigns = async (req, res) => {
  try {
    const all_campaigns = await Campaign.findAll();
    if (all_campaigns && all_campaigns != []) { //added an empty array condition since it is considered true by js
      return res.status(200) //ok
      .json({
        data: all_campaigns,
        status: 200,
        success: true,
        message: "Got all campaigns"
      });
    } else {
      return res.status(404) //not found
      .json({
        data: null,
        status: 404,
        success: false,
        message: `No campaigns found`,
      })
    }
  } catch (error) {
    return res.status(500) //internal server error
    .json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't get campaigns due to server error: ${error}`,
    });
  }
}

//Get accepted campaigns
const getAcceptedCampaigns = async (req, res) => {
  try {
    const accepted_campaigns = await Campaign.findAll({
      where: {
        isAccepted: true,
      }
    })
    if (accepted_campaigns && accepted_campaigns != []) { //added an empty array condition to only accept relevant data
      return res.status(200)
      .json({
        data: accepted_campaigns,
        status: 200,
        success: true,
        message: `accepted campaigns are successfully found`,
      })
    } else {
      return res.status(404) //not found
      .json({
        data: null,
        status: 404,
        success: false,
        message: `No accepted campaigns found`
      })
    }
  } catch (error) {
    return res.status(500) //internal server error
    .json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't get accepted campaigns due to server error: ${error}`,
    });
  }
}

//Get pending campaigns
const getPendingCampaigns = async (req, res) => {
  try {
    const pending_campaigns = await Campaign.findAll({
      where: {
        isAccepted: false,
      }
    })
    if (pending_campaigns && pending_campaigns != []) { //since [] is read as true, we added the != [] condition
      return res.status(200)
      .json({
        data: pending_campaigns,
        status: 200,
        success: true,
        message: `Pending campaigns are successfully found`,
      })
    } else {
      return res.status(404) //not found
      .json({
        data: null,
        status: 404,
        success: false,
        message: `No pending campaigns found`,
      })
    }
  } catch (error) {
    return res.status(500) //internal server error
    .json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't get pending campaigns due to server error: ${error}`,
    });
  }
}

//Get hidden campaigns
const getHiddenCampaigns = async (req, res) => {
  try {
    const hidden_campaigns = await Campaign.findAll({
      where: {
        isHidden: true,
      }
    })
    if (hidden_campaigns && hidden_campaigns != []) { //since [] is read as true, we added the != [] condition
      return res.status(200)
      .json({
        data: hidden_campaigns,
        status: 200,
        success: true,
        message: `Hidden campaigns are successfully found`,
      })
    } else {
      return res.status(404) //not found
      .json({
        data: null,
        status: 404,
        success: false,
        message: `No Hidden campaigns found`,
      })
    }
  } catch (error) {
    return res.status(500) //internal server error
    .json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't get Hidden campaigns due to server error: ${error}`,
    });
  }
}

//Get visible campaigns
const getVisibleCampaigns = async (req, res) => {
  try {
    const visible_campaigns = await Campaign.findAll({
      where: {
        isHidden: false,
      }
    })
    if (visible_campaigns && visible_campaigns != []) { //since [] is read as true, we added the != [] condition
      return res.status(200)
      .json({
        data: visible_campaigns,
        status: 200,
        success: true,
        message: `Visible campaigns are successfully found`,
      })
    } else {
      return res.status(404) //not found
      .json({
        data: null,
        status: 404,
        success: false,
        message: `No Visible campaigns found`,
      })
    }
  } catch (error) {
    return res.status(500) //internal server error
    .json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't get Visible campaigns due to server error: ${error}`,
    });
  }
}

//Get campaign by campaignName
const getCampaignByCampaignName = async (req, res) => {
  try {
    const requested_campaign_name = req.params.name; //put :name in url as parameter
    const requested_campaign = await Campaign.findOne({
      where: {
        campaign_name: requested_campaign_name,
      }
    });
    if (requested_campaign && requested_campaign != []) { //added != [], since empty array is a truthy value
      return res.status(200)
      .json({
        data: requested_campaign,
        status: 200,
        success: true,
        message: "Requested campaign is successfully found",
      })
    } else {
      return res.status(404) //not found
      .json({
        data: null,
        status: 404,
        success: false,
        message: `There is no campaign named: ${requested_campaign_name}`,
      })
    }
  } catch (error) {
    return res.status(500) //internal server error
    .json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't get the requested campaign due to server error: ${error}`,
    });
  }
}

//Accept(update isAccepted) a campaign by name
const acceptCampaign = async (req, res) => {
  try {
    const campaign_name_to_accept = req.params.name;
    const [accepted_campaign_rows] = await Campaign.update({ //put accepted campaign in array since update() returns an array with updated row numbers
      isAccepted: true,
    },{
      where: {
        campaign_name: campaign_name_to_accept,
      },
      // returning: true, //to return the updated value
    });
    if (accepted_campaign_rows > 0) {
      res.sendStatus(202) //accepted
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    return res.status(500) //internal server error
    .json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't accept the chosen campaign due to server error: ${error}`,
    });
  }
}

//Hide(update isHidden) a campaign by name
const hideCampaign = async (req, res) => {
  try {
    const campaign_name_to_hide = req.params.name;
    const [hidden_campaign_rows] = await Campaign.update({ //put hidden campaign in array since update() returns an array with updated row numbers
      isHidden: true,
    },{
      where: {
        campaign_name: campaign_name_to_hide,
      },
      // returning: true, //to return the updated value
    });
    if (hidden_campaign_rows > 0) {
      res.sendStatus(202) //accepted
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    return res.status(500) //internal server error
    .json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't hide the chosen campaign due to server error: ${error}`,
    });
  }
}

//unhide

//change campaign name

//change description

//change target

//change amount

//change start date

//change end date

//Delete a campaign by name
const deleteCampaignByCampaignName = async (req, res) => {
  try {
    const campaign_name_to_delete = req.params.name; // put :name as parameter in the url
    const deleted_campaign_rows = await Campaign.destroy({
      where: {
        campaign_name: campaign_name_to_delete,
      }
    })
    if (deleted_campaign_rows > 0) {
      return res.sendStatus(200)
    } else {
      res.sendStatus(404) //not found
    }
  } catch (error) {
    return res.status(500) //internal server error
    .json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't delete the chosen campaign due to server error: ${error}`,
    });
  }
}

//Delete pending campaigns
const deletePendingCampaigns = async (req, res) => {
  try {
    const deleted_campaign_rows = await Campaign.destroy({
      where: {
        isAccepted: false,
      }
    })
    if (deleted_campaign_rows > 0) {
      return res.sendStatus(200)
    } else {
      res.status(404) //not found
      .send(`No pending campaigns to delete`)
    }
  } catch (error) {
    return res.status(500) //internal server error
    .json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't delete pending campaigns due to server error: ${error}`,
    });
  }
}

exports = {
  createCampaign,
  getAllCampaigns,
  getAcceptedCampaigns,
  getPendingCampaigns,
  getHiddenCampaigns,
  getVisibleCampaigns,
  getCampaignByCampaignName,
  acceptCampaign,
  hideCampaign,
  deleteCampaignByCampaignName,
  deletePendingCampaigns,
}