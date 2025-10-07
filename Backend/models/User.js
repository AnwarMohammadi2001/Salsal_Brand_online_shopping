import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // use email instead of username
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: true },
});

const User = mongoose.model("User", UserSchema);
export default User;
