import sequelize from "../Config/connection.js"; //for donation transaction in amount change
import Campaign from "../Models/campaignsModel.js";
import User from "../Models/usersModel.js";
import Donation from "../Models/donationsModel.js";

class CampaignController{
  //Post a Campaign ----------------------------------------------------------------------------------------------------
static async createCampaign (req, res) {
  // console.log("this is the body: ",req.body)
  // console.log("this is the file: ",req.file)
  // console.log("this is the file path: ",req.file.path)
  try { 
    let new_campaign = new Campaign(req.body); //an instance of campaign gotten from body to manipulate it
    if (req.file) {
      new_campaign.campaign_image = req.file.path //path key is already passed in the object sent in the body form through multer
    }
    const userId = req.params.userId
  new_campaign.userId = userId
    const saved_new_campaign = await new_campaign.save(); //saving the manipulated instance to the db
    return res.status(201) //created
    .json({
      data: saved_new_campaign.toJSON(), //used tojson() to show the data and not the instance details
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
// to populate :    const all_campaigns = await Campaign.findAll({include: [Donation, User]});
//Get all campaigns ----------------------------------------------------------------------------------------------------
 static async getAllCampaigns (req, res) {
  try {
    const all_campaigns = await Campaign.findAll({include: [User]});
    if (all_campaigns && all_campaigns.length > 0) { //added an empty array condition since it is considered true by js
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


//Get accepted campaigns ----------------------------------------------------------------------------------------------------
 static async getAcceptedCampaigns (req, res) {
  try {
    const accepted_campaigns = await Campaign.findAll({
      where: {isAccepted: true},
      include: [User]
    })
    if (accepted_campaigns && accepted_campaigns.length > 0) { //added an empty array condition to only accept relevant data
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

//Get pending campaigns ----------------------------------------------------------------------------------------------------
 static async getPendingCampaigns (req, res) {
  try {
    const pending_campaigns = await Campaign.findAll({
      where: {
        isAccepted: false,
      }
    })
    if (pending_campaigns && pending_campaigns.length > 0) { //since [] is read as true, we added the.length > 0 condition
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

//Get hidden campaigns ----------------------------------------------------------------------------------------------------
 static async getHiddenCampaigns (req, res) {
  try {
    const hidden_campaigns = await Campaign.findAll({
      where: {
        isHidden: true,
      }
    })
    if (hidden_campaigns && hidden_campaigns.length > 0) { //since [] is read as true, we added the.length > 0 condition
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

//Get visible campaigns ----------------------------------------------------------------------------------------------------
 static async getVisibleCampaigns (req, res) {
  try {
    const visible_campaigns = await Campaign.findAll({
      where: {
        isHidden: false,
        isAccepted:true
      },
      include: [User]

      
    })
    if (visible_campaigns && visible_campaigns.length > 0) { //since [] is read as true, we added the.length > 0 condition
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

//Get campaign by id ----------------------------------------------------------------------------------------------------
 static async getCampaignByCampaignName (req, res) {
  try {
    const { id }= req.params; //put :name in url as parameter
    const requested_campaign = await Campaign.findByPk(id, {include:[User]});
    if (requested_campaign ) { //added.length > 0, since empty array is a truthy value  
      //&& requested_campaign.length > 0
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

//Accept(update isAccepted) a campaign by name ----------------------------------------------------------------------------------------------------
 static async acceptCampaign (req, res) {
  try {
    const campaign_name_to_accept = req.params.name;
    const [accepted_campaign_rows] = await Campaign.update({ //put accepted campaign in array since update() returns an array with updated row numbers
      isAccepted: true,
    },{
      where: {
        campaign_name: campaign_name_to_accept,
      },
      // returning: true, //to return the updated value, uncomment the returning line and add an array as a second item in campaign rows array
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

//Hide(update isHidden) a campaign by name ----------------------------------------------------------------------------------------------------
 static async hideCampaign (req, res) {
  try {
    const campaign_name_to_hide = req.params.name; //put :name in url
    const [number_of_campaign_changed_rows_hide] = await Campaign.update({ //put number of campaign changed rows in array since update() returns an array with updated row numbers
      isHidden: true,
    },{
      where: {
        campaign_name: campaign_name_to_hide,
      },
      // returning: true, //to return the updated value, uncomment the returning line and add an array as a second item in number of rows array
    });
    if (number_of_campaign_changed_rows_hide > 0) {
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

//Unhide(update isHidden) a campaign by name ----------------------------------------------------------------------------------------------------
 static async unhideCampaign (req, res) {
  try {
    const campaign_name_to_hide = req.params.name; //put :name in url
    const [number_of_campaign_changed_rows_unhide] = await Campaign.update({ //put number of campaign rows in array since update() returns an array with updated row numbers
      isHidden: false,
    },{
      where: {
        campaign_name: campaign_name_to_hide,
      },
      // returning: true, //to return the updated value, uncomment the returning line and add an array as a second item in number of rows array
    });
    if (number_of_campaign_changed_rows_unhide > 0) {
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
      message: `Couldn't unhide the chosen campaign due to server error: ${error}`,
    });
  }
}


//change image ----------------------------------------------------------------------------------------------------
static async changeCampaignImage (req, res) {
  try {
    const input_campaign_name = req.params.name; //put :name in url
    if(req.file) { //-----------------------------------------------------------------first if statement openning
      const [number_of_campaign_changed_rows_image] = await Campaign.update({ //we put campaign rows in array since update() returns an array with updated row numbers
        campaign_image: req.file.path,
      },{
        where: {
          campaign_name: input_campaign_name,
        },
      });
      if (number_of_campaign_changed_rows_image > 0) { //-------------------second if statement openning
        res.status(200) //ok
        .json({
          data:null,
          status: 200,
          success: true,
          message: `changed the campaign image successfully to: ${req.file.path}`,
        });
      } else {
          res.status(404) //not found
          .send("campaign name not found")
        } //----------------------------------------------------------------second if statement closing
    } else {
    return res.status(404).send("Image file not found")
  } //----------------------------------------------------------------------------------first if statement closing
  } catch (error) {
    return res.status(500) //internal server error
    .json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't change image for the chosen campaign due to server error: ${error}`,
    });
  }
}





//Delete a campaign by name ----------------------------------------------------------------------------------------------------
 static async deleteCampaignByCampaignName (req, res) {
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

//Delete pending campaigns ----------------------------------------------------------------------------------------------------
 static async deletePendingCampaigns (req, res) {
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


//get days difference
static async daysDiff (req, res) {
  try {
    const { id } = req.params
   const date = await Campaign.findByPk(id, {
    attributes: ['start_date', 'end_date'],
  }) 
  if (!date) {
    return res.status(404).json({
      data: null,
      status: 404,
      success: false,
      message: `Campaign with ID not found`,
    });
  }


    // Convert date strings to Date objects
    const startDate = new Date(date.start_date);
    const endDate = new Date(date.end_date);

    // Check if the date conversion was successful
    if (isNaN(startDate) || isNaN(endDate)) {
      return res.status(500).json({
        data: null,
        status: 500,
        success: false,
        message: 'Invalid date format in the database',
      });
    }

    // Calculate the difference in days
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  res.status(200).json(daysDifference)
  } catch (error) {
    return res.status(500) //internal server error
    .json({
      data: null,
      status: 500,
      success: false,
      message: `error is:  ${error}`,
    });
  }
}
}
//export controllers ----------------------------------------------------------------------------------------------------
export default CampaignController