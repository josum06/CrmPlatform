import express from "express";
import { createCampaign, listCampaigns } from "../controllers/campaignController.js";

const router = express.Router();

router.post("/", createCampaign);    // ✅ Create campaign
router.get("/", listCampaigns);      // ✅ List past campaigns

export default router;
