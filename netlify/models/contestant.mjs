import mongoose from "mongoose";

const contestant = mongoose.Schema({
  raffle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "raffle",
    required: true,
  },
  raffleName: { type: String, required: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  fullName: { type: String, required: true, trim: true },
  email: { type: String },
  phone: { type: String },
  avatar: { type: Number },
  dateJoined: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});

export default mongoose.model("contestant", contestant);
