import CampaignController from "../Controllers/campaignsController.js";
import {upload} from "../Config/cloudinary.js";
import express from "express";

const campaignRouter = express.Router();

//Create ------------------------------------------------------------------------------
campaignRouter.post("/post", upload.single('campaign_image'), CampaignController.createCampaign);
//Read --------------------------------------------------------------------------------
campaignRouter.get("/getAll", CampaignController.getAllCampaigns);
campaignRouter.get("/getAllAccepted", CampaignController.getAcceptedCampaigns);
campaignRouter.get("/getAllPending", CampaignController.getPendingCampaigns);
campaignRouter.get("/getAllHidden", CampaignController.getHiddenCampaigns);
campaignRouter.get("/getAllVisible", CampaignController.getVisibleCampaigns);
campaignRouter.get("/getByName/:name", CampaignController.getCampaignByCampaignName);
//Update ------------------------------------------------------------------------------
campaignRouter.put("/accept/:name", CampaignController.acceptCampaign);
campaignRouter.put("/hide/:name", CampaignController.hideCampaign);
campaignRouter.put("/unhide/:name", CampaignController.unhideCampaign);
campaignRouter.put("/changeName/:name/:newName", CampaignController.changeCampaignName);
campaignRouter.put("/changeDescription/:name/:description", CampaignController.changeCampaignDescription);
campaignRouter.put("/changeImage/:name", upload.single('campaign_image'), CampaignController.changeCampaignImage);
campaignRouter.put("/changeTarget/:name/:target", CampaignController.changeCampaignTarget);
campaignRouter.put("/changeAmount/:name/:amount", CampaignController.changeCampaignAmount);
campaignRouter.put("/changeStartDate/:name/:startDate", CampaignController.changeCampaignStartDate);
campaignRouter.put("/changeEndDate/:name/:endDate", CampaignController.changeCampaignEndDate);
//Delete ------------------------------------------------------------------------------
campaignRouter.delete("/deleteByName/:name", CampaignController.deleteCampaignByCampaignName);
campaignRouter.delete("/deleteAllPending", CampaignController.deletePendingCampaigns);

export default campaignRouter;