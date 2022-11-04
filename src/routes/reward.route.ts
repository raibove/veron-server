import express from "express";
import { addPoints, getPoints } from "../controllers/reward.controller";

const router = express.Router();

router.get("/", getPoints);
router.post("/", addPoints);

export default router;