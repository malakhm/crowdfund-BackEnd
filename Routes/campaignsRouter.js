import CampaignController from "../Controllers/campaignsController.js";

import express from "express";
import Verification from '../Middleware/jwt.js'
const campaignRouter = express.Router();

//Create ------------------------------------------------------------------------------
campaignRouter.post("/post",Verification.verifyCreator,CampaignController.createCampaign);
//Read --------------------------------------------------------------------------------
campaignRouter.get("/getAll", Verification.verifyCreator,CampaignController.getAllCampaigns);
campaignRouter.get("/getAllAccepted", Verification.verifyAdmin,CampaignController.getAcceptedCampaigns);
campaignRouter.get("/getAllPending", Verification.verifyCreator,CampaignController.getPendingCampaigns);
campaignRouter.get("/getAllHidden", Verification.verifyCreator,CampaignController.getHiddenCampaigns);
campaignRouter.get("/getAllVisible", Verification.verifyLogin,CampaignController.getVisibleCampaigns);
campaignRouter.get("/getByName/:id", Verification.verifyLogin,CampaignController.getCampaignByCampaignName);
//Update ------------------------------------------------------------------------------
campaignRouter.put("/accept/:name", Verification.verifyAdmin,CampaignController.acceptCampaign);
campaignRouter.put("/hide/:name", Verification.verifyAdmin,CampaignController.hideCampaign);
campaignRouter.put("/unhide/:name", Verification.verifyAdmin,CampaignController.unhideCampaign);

//Delete ------------------------------------------------------------------------------
campaignRouter.delete("/deleteByName/:name", Verification.verifyCreator,CampaignController.deleteCampaignByCampaignName);
campaignRouter.delete("/deleteAllPending", Verification.verifyAdmin,CampaignController.deletePendingCampaigns);

export default campaignRouter;