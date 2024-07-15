import mongoose from "mongoose";

const contestant = mongoose.Schema({
  contestantID: { type: String, unique: true },
  raffle: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  avatar: { type: Number },
  dateJoined: { type: Date, default: Date.now },
  user: { type: String, required: true },
});

contestant.pre("save", function (next) {
  if (!this.contestantID) {
    this.contestantID = this._id;
  }
  next();
});

export default mongoose.model("contestant", contestant);
