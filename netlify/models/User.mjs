import mongoose from "mongoose";

const user = mongoose.Schema({
  userID: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  name: { type: String },
  userName: { type: String },
  email: { type: String, unique: true, required: true },
});

export default mongoose.model("user", user);
