import {
  createCampaign,
  getAllCampaigns,
  createCampaign,
  getAllCampaigns,
  getAcceptedCampaigns,
  getPendingCampaigns,
  getHiddenCampaigns,
  getVisibleCampaigns,
  getCampaignByCampaignName,
  acceptCampaign,
  hideCampaign,
  unhideCampaign,
  changeCampaignName,
  changeCampaignDescription,
  changeCampaignTarget,
  changeCampaignAmount,
  changeCampaignStartDate,
  changeCampaignEndDate,
  deleteCampaignByCampaignName,
  deletePendingCampaigns,
} from "../Controllers/campaignsController";

import express from "express";

const campaignRouter = express.Router();

//Create ------------------------------------------------------------------------------
campaignRouter.post("/post", createCampaign);
//Read --------------------------------------------------------------------------------
campaignRouter.get("/getAll", getAllCampaigns);
campaignRouter.get("/getAllAccepted", getAcceptedCampaigns);
campaignRouter.get("/getAllPending", getPendingCampaigns);
campaignRouter.get("/getAllHidden", getHiddenCampaigns);
campaignRouter.get("/getAllVisible", getVisibleCampaigns);
campaignRouter.get("/getByName/:name", getCampaignByCampaignName);
//Update ------------------------------------------------------------------------------
campaignRouter.put("/accept/:name", acceptCampaign);
campaignRouter.put("/hide/:name", hideCampaign);
campaignRouter.put("/unhide/:name", unhideCampaign);
campaignRouter.put("/changeName/:name/:newName", changeCampaignName);
campaignRouter.put("/changeDescription/:name/:description", changeCampaignDescription);
campaignRouter.put("/changeTarget/:name/:target", changeCampaignTarget);
campaignRouter.put("/changeAmount/:name/:amount", changeCampaignAmount);
campaignRouter.put("/changeStartDate/:name/:startDate", changeCampaignStartDate);
campaignRouter.put("/changeEndDate/:name/:endDate", changeCampaignEndDate);
//Delete ------------------------------------------------------------------------------
campaignRouter.delete("/deleteByName/:name", deleteCampaignByCampaignName);
campaignRouter.delete("/deleteAllPending", deletePendingCampaigns);

export default campaignRouter;