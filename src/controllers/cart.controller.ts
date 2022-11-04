import { Request, Response } from "express";
import Cart from "../models/cart.model";

export const addToCart = async (req: Request, res: Response) => {
  // console.log(req.headers)
  const bearerHeader = req.headers["authorization"];
  console.log(bearerHeader);
  const data = req.body;
  let findProduct = { userMail: data.userMail, productId: data.productId };
  let userProduct = await Cart.findOne(findProduct);
  if (userProduct) {
    console.log("increase quantity");
    let updatedQuantity = userProduct.quantity + 1;
    Cart.findOneAndUpdate(
      findProduct,
      { quantity: updatedQuantity },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("in err");

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
};

export const getCart = () => {};
