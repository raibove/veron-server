import express from "express";
import { addToCart, getCart } from "../controllers/cart.controller";

const router = express.Router();

router.get("/", getCart);

router.post("/", addToCart);

export default router;
