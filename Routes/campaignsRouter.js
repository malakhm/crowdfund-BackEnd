import CampaignController from "../Controllers/campaignsController.js";
import {upload} from "../Config/cloudinary.js";
import express from "express";
import Verification from '../Middleware/jwt.js'
const campaignRouter = express.Router();

//Create ------------------------------------------------------------------------------
campaignRouter.post("/post",upload.single('campaign_image'),Verification.verifyCreator,CampaignController.createCampaign);
//Read --------------------------------------------------------------------------------
campaignRouter.get("/getAll", Verification.verifyCreator,CampaignController.getAllCampaigns);
campaignRouter.get("/getAllAccepted", Verification.verifyAdmin,CampaignController.getAcceptedCampaigns);
campaignRouter.get("/getAllPending", Verification.verifyCreator,CampaignController.getPendingCampaigns);
campaignRouter.get("/getAllHidden", Verification.verifyCreator,CampaignController.getHiddenCampaigns);
campaignRouter.get("/getAllVisible", Verification.verifyLogin,CampaignController.getVisibleCampaigns);
campaignRouter.get("/getByName/:id", Verification.verifyLogin,CampaignController.getCampaignByCampaignName);
//Update ------------------------------------------------------------------------------
campaignRouter.put("/accept/:name", CampaignController.acceptCampaign);
campaignRouter.put("/hide/:name", CampaignController.hideCampaign);
campaignRouter.put("/unhide/:name", CampaignController.unhideCampaign);
campaignRouter.put("/changeName/:name/:newName", CampaignController.changeCampaignName);
campaignRouter.put("/changeDescription/:name/:description", CampaignController.changeCampaignDescription);
campaignRouter.put("/changeTarget/:name/:target", CampaignController.changeCampaignTarget);
campaignRouter.put("/changeAmount/:name/:amount", CampaignController.changeCampaignAmount);
campaignRouter.put("/changeStartDate/:name/:startDate", CampaignController.changeCampaignStartDate);
campaignRouter.put("/changeEndDate/:name/:endDate", CampaignController.changeCampaignEndDate);
//Delete ------------------------------------------------------------------------------
campaignRouter.delete("/deleteByName/:name", Verification.verifyCreator,CampaignController.deleteCampaignByCampaignName);
campaignRouter.delete("/deleteAllPending", Verification.verifyAdmin,CampaignController.deletePendingCampaigns);

export default campaignRouter;