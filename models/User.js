import mongoose, { model, Schema } from 'mongoose';

// User Model Schema
const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
});

const User = model("User", userSchema);

export default User;
