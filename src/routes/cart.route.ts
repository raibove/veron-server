import express from "express";
import { addToCart, chekoutCart, getCart } from "../controllers/cart.controller";

const router = express.Router();

router.get("/", getCart);

router.get("/checkout", chekoutCart);

router.post("/", addToCart);

export default router;
