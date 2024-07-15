import mongoose from "mongoose";

const raffle = mongoose.Schema({
  raffleID: { type: String, unique: true },
  raffleName: { type: String, required: true },
  endDate: { type: String },
  endTime: { type: String },
  signupFields: [String],
  contestants: [String],
  winner: { type: String },
  user: { type: String },
});

raffle.pre("save", function (next) {
  if (!this.raffleID) {
    this.raffleID = this._id;
  }
  next();
});

export default mongoose.model("raffle", raffle);
