import express from "express";
import { addPoints, claimReward, getPoints } from "../controllers/reward.controller";

const router = express.Router();

router.get("/", getPoints);
router.post("/", addPoints);
router.post("/claim", claimReward)
export default router;