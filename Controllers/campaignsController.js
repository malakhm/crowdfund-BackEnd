import Campaign from "../Models/campaignsModel.js";

class CampaignController{
  //Post a Campaign ----------------------------------------------------------------------------------------------------
static async createCampaign (req, res) {
  // console.log("this is the body: ",req.body)
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

//Get all campaigns ----------------------------------------------------------------------------------------------------
 static async getAllCampaigns (req, res) {
  try {
    const all_campaigns = await Campaign.findAll();
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
      where: {
        isAccepted: true,
      }
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
      }
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

//Get campaign by campaignName ----------------------------------------------------------------------------------------------------
 static async getCampaignByCampaignName (req, res) {
  try {
    const requested_campaign_name = req.params.name; //put :name in url as parameter
    const requested_campaign = await Campaign.findAll({ //was findone, but its not working, try it again later
      where: {
        campaign_name: requested_campaign_name,
      }
    });
    console.log("this is requested campaign: ",requested_campaign);
    if (requested_campaign && requested_campaign.length > 0) { //added.length > 0, since empty array is a truthy value
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

//change campaign name ----------------------------------------------------------------------------------------------------
 static async changeCampaignName (req, res) {
  try {
    const campaign_name_to_change = req.params.name; //put :name in url
    const new_campaign_name = req.params.newName; //put :newName in url
    const [number_of_campaign_changed_rows_name] = await Campaign.update({ //we put campaign rows in array since update() returns an array with updated row numbers
      campaign_name: new_campaign_name,
    },{
      where: {
        campaign_name: campaign_name_to_change,
      },
    });
    if (number_of_campaign_changed_rows_name > 0) {
      res.status(200) //ok
      .json({
        data: null,
        status: 200,
        success: true,
        message: `changed the campaign name successfully from ${campaign_name_to_change} to: ${new_campaign_name}`,
      });
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    return res.status(500) //internal server error
    .json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't change name of the chosen campaign due to server error: ${error}`,
    });
  }
}

//change description ----------------------------------------------------------------------------------------------------
 static async changeCampaignDescription (req, res) {
  try {
    const input_campaign_name = req.params.name; //put :name in url
    const new_description = req.params.description; //put :description in url
    const [number_of_campaign_changed_rows_description] = await Campaign.update({ //we put campaign rows in array since update() returns an array with updated row numbers
      description: new_description,
    },{
      where: {
        campaign_name: input_campaign_name,
      },
    });
    if (number_of_campaign_changed_rows_description > 0) {
      res.status(200) //ok
      .json({
        data:null,
        status: 200,
        success: true,
        message: `changed the campaign description successfully to: ${new_description}`,
      });
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    return res.status(500) //internal server error
    .json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't change description for the chosen campaign due to server error: ${error}`,
    });
  }
}

//change target ----------------------------------------------------------------------------------------------------
 static async changeCampaignTarget (req, res) {
  try {
    const input_campaign_name = req.params.name; //put :name in url
    const new_target = req.params.target; //put :target in url
    const [number_of_campaign_changed_rows_target] = await Campaign.update({ //we put campaign rows in array since update() returns an array with updated row numbers
      target: new_target,
    },{
      where: {
        campaign_name: input_campaign_name,
      },
    });
    if (number_of_campaign_changed_rows_target > 0) {
      res.status(200) //ok
      .json({
        data: null,
        status: 200,
        success: true,
        message: `changed the campaign target successfully to: ${new_target}`,
      });
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    return res.status(500) //internal server error
    .json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't change target for the chosen campaign due to server error: ${error}`,
    });
  }
}

//change amount ----------------------------------------------------------------------------------------------------
 static async changeCampaignAmount (req, res) {
  try {
    const input_campaign_name = req.params.name; //put :name in url
    const new_amount = req.params.amount; //put :amount in url
    const [number_of_campaign_changed_rows_amount] = await Campaign.update({ //we put campaign rows in array since update() returns an array with updated row numbers
      amount: new_amount,
    },{
      where: {
        campaign_name: input_campaign_name,
      },
    });
    if (number_of_campaign_changed_rows_amount > 0) {
      res.status(200) //ok
      .json({
        data: null,
        status: 200,
        success: true,
        message: `changed the campaign amount successfully to: ${new_amount}`,
      });
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    return res.status(500) //internal server error
    .json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't change amount for the chosen campaign due to server error: ${error}`,
    });
  }
}

//change start date ----------------------------------------------------------------------------------------------------
 static async changeCampaignStartDate (req, res) {
  try {
    const input_campaign_name = req.params.name; //put :name in url
    const new_start_date = req.params.startDate; //put :startDate in url using YYYY-MM-DD format and try it
    const [number_of_campaign_changed_rows_start_date] = await Campaign.update({ //we put campaign rows in array since update() returns an array with updated row numbers
      start_date: new_start_date,
    },{
      where: {
        campaign_name: input_campaign_name,
      },
    });
    if (number_of_campaign_changed_rows_start_date > 0) {
      res.status(200) //ok
      .json({
        data: null,
        status: 200,
        success: true,
        message: `changed the campaign start date successfully to: ${new_start_date}`,
      });
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    return res.status(500) //internal server error
    .json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't change start date for the chosen campaign due to server error: ${error}`,
    });
  }
}

//change end date ----------------------------------------------------------------------------------------------------
 static async changeCampaignEndDate (req, res) {
  try {
    const input_campaign_name = req.params.name; //put :name in url
    const new_end_date = req.params.endDate; //put :endDate in url using YYYY-MM-DD format and try it
    const [number_of_campaign_changed_rows_end_date] = await Campaign.update({ //we put campaign rows in array since update() returns an array with updated row numbers
      end_date: new_end_date,
    },{
      where: {
        campaign_name: input_campaign_name,
      },
    });
    if (number_of_campaign_changed_rows_end_date > 0) {
      res.status(200) //ok
      .json({
        data: null, //convert to json to see object
        status: 200,
        success: true,
        message: `changed the campaign end date successfully to: ${new_end_date}`,
      });
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    return res.status(500) //internal server error
    .json({
      data: null,
      status: 500,
      success: false,
      message: `Couldn't change end date for the chosen campaign due to server error: ${error}`,
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
};

//export controllers ----------------------------------------------------------------------------------------------------
export default CampaignController