import {createCampaign, getAllCampaigns} from "../Controllers/campaignsController";

import express from "express";

const campaignRouter = express.Router();

campaignRouter.post("/post", createCampaign);
campaignRouter.get("/getAll", getAllCampaigns);

export default campaignRouter;