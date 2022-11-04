import mongoose from "mongoose";

interface CartDocument extends mongoose.Document {
  userMail: string;
  category: string;
  name: string;
  price: number;
  quantity: number;
  updateDate: Array<Date>;
  productId: number;
  createdAt: Date;
  productImage: string;
}

const CartSchema = new mongoose.Schema({
  userMail: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  productId: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updateDate: {
    type: Array,
    default: [new Date()],
  },
  productImage: {
    type: String,
    required: true,
  },
});

export default mongoose.model<CartDocument>("Cart", CartSchema);
