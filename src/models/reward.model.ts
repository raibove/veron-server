import mongoose from "mongoose";

interface RewardDocument extends mongoose.Document {
  email: string;
  points:number;
}

const RewardSchema = new mongoose.Schema({
  userMail: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<RewardDocument>("Reward", RewardSchema);
