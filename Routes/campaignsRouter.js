import CampaignController from "../Controllers/campaignsController.js";
import {upload} from "../Config/cloudinary.js";
import express from "express";
import Verification from '../Middleware/jwt.js'
const campaignRouter = express.Router();

//Create ------------------------------------------------------------------------------
campaignRouter.post("/post/:id", upload.single('campaign_image'), CampaignController.createCampaign);
//Read --------------------------------------------------------------------------------
campaignRouter.get("/getAll",CampaignController.getAllCampaigns);
campaignRouter.get("/getAllAccepted",CampaignController.getAcceptedCampaigns);
campaignRouter.get("/getAllPending",CampaignController.getPendingCampaigns);
campaignRouter.get("/getAllHidden",CampaignController.getHiddenCampaigns);
campaignRouter.get("/getAllVisible",CampaignController.getVisibleCampaigns);
campaignRouter.get("/getByName/:id", CampaignController.getCampaignByCampaignName);
campaignRouter.get('/getdays/:id', CampaignController.daysDiff)
campaignRouter.get('/getById/:userId',CampaignController.getCampaignByCreatorId)
//Update ------------------------------------------------------------------------------
campaignRouter.put("/accept/:name", CampaignController.acceptCampaign);
campaignRouter.put("/hide/:name", CampaignController.hideCampaign);
campaignRouter.put("/unhide/:name", CampaignController.unhideCampaign);
campaignRouter.put("/changeImage/:name", upload.single('campaign_image'),CampaignController.changeCampaignImage);
// campaignRouter.put("/addADonationToAmount/:userId/:campaignId/:amount", Verification.verifyLogin,CampaignController.addADonationToAmount);
//Delete ------------------------------------------------------------------------------
campaignRouter.delete("/deleteByName/:name",CampaignController.deleteCampaignByCampaignName);
campaignRouter.delete("/deleteAllPending", CampaignController.deletePendingCampaigns);

export default campaignRouter;