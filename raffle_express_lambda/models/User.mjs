import mongoose from "mongoose";

const user = mongoose.Schema({
  userID: { type: String, unique: true },
  email: { type: String },
  raffles: [String],
  contestants: [String],
});

user.pre("save", function (next) {
  if (!this.userID) {
    this.userID = this._id;
  }
  next();
});

export default mongoose.model("user", user);
