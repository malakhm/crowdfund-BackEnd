import CampaignController from "../Controllers/campaignsController.js";

import express from "express";

const campaignRouter = express.Router();

//Create ------------------------------------------------------------------------------
campaignRouter.post("/post", CampaignController.createCampaign);
//Read --------------------------------------------------------------------------------
campaignRouter.get("/getAll", CampaignController.getAllCampaigns);
campaignRouter.get("/getAllAccepted", CampaignController.getAcceptedCampaigns);
campaignRouter.get("/getAllPending", CampaignController.getPendingCampaigns);
campaignRouter.get("/getAllHidden", CampaignController.getHiddenCampaigns);
campaignRouter.get("/getAllVisible", CampaignController.getVisibleCampaigns);
campaignRouter.get("/getByName/:id", CampaignController.getCampaignByCampaignName);
//Update ------------------------------------------------------------------------------
campaignRouter.put("/accept/:name", CampaignController.acceptCampaign);
campaignRouter.put("/hide/:name", CampaignController.hideCampaign);
campaignRouter.put("/unhide/:name", CampaignController.unhideCampaign);

//Delete ------------------------------------------------------------------------------
campaignRouter.delete("/deleteByName/:name", CampaignController.deleteCampaignByCampaignName);
campaignRouter.delete("/deleteAllPending", CampaignController.deletePendingCampaigns);

export default campaignRouter;