import { Request, Response } from "express";
import Cart from "../models/cart.model";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const addToCart = async (req: Request, res: Response) => {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    return res.status(403).json("Not Authorized");
  }

  try {
    const bearer = bearerHeader?.split(" ");
    const token = bearer[1];
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(403).json("User do not exist");
    }

    const data = req.body;
    let findProduct = { userMail: payload.email, productId: data.productId };
    let userProduct = await Cart.findOne(findProduct);
    if (userProduct) {
      let updatedQuantity = userProduct.quantity + 1;
      Cart.findOneAndUpdate(
        findProduct,
        { quantity: updatedQuantity },
        { new: true },
        (err, doc) => {
          if (err) {
            return res.status(500).json("Something wrong when updating data!");
          }
        }
      );
    } else {
      // add product
      let newUserProduct = await new Cart({
        userMail: data.userMail,
        name: data.name,
        productId: data.productId,
        price: data.productId,
        quantity: data.quantity,
        productImage: data.productImage,
        category: data.category,
      });
      await newUserProduct.save();
    }
    return res.status(200).json("product added to cart");
  } catch (e) {
    res.status(403).json("Failed to validate user");
  }
};

export const getCart = async (req: Request, res: Response) => {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    return res.status(403).json("Not Authorized");
  }
  try {
    const bearer = bearerHeader?.split(" ");
    const token = bearer[1];
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(403).json("User do not exist");
    }

    let userCart = await Cart.find({ userMail: payload.email });

    return res.json(userCart);
  } catch (e) {
    res.status(403).json("Failed to validate user");
  }
};
