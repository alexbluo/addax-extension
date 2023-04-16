import express from "express";
import { getAdvertisers } from "../controllers/advertiserController";

const router = express.Router();

router.get("/", getAdvertisers);

export default router;
