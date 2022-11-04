import express from "express";
import { addToCart } from "../controllers/cart.controller";

const router = express.Router();

router.post("/", addToCart);

export default router;