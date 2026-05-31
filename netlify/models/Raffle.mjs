import mongoose from "mongoose";

const raffle = mongoose.Schema({
  raffleName: { type: String, required: true },
  description: { type: String },
  endDate: { type: String },
  endTime: { type: String },
  phone: { type: Boolean },
  winner: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  pin: { type: String, unique: true },
});

export default mongoose.model("raffle", raffle);
