import express from "express";
import authRoutes from "./routes/auth.route";
import cartRoutes from "./routes/cart.route";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);

mongoose.connect(`${process.env.MONGO_URI}`);

const db = mongoose.connection;
db.once("open", () => console.log("Connected to Mongo DB!!"));
db.on("error", (error) => console.error(error));

app.listen(PORT, () =>
  console.log(`The server is up and running on PORT ${PORT} 🚀`)
);