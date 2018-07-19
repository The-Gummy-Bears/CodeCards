const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
    },
    categories: [String]
  });
  const User = mongoose.model('User', UserSchema);
  module.exports = User;