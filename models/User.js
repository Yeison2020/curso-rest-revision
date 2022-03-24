const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: string,
    require: [true, "Name is requiered please"],
  },
  email: {
    type: string,
    require: [true, "Email is requiered please"],
    unique: true,
  },
  password: {
    type: string,
    require: [true, "Password is requiered please"],
  },
  image: {
    type: string,
  },

  role: {
    type: string,
    require: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },

  status: {
    type: Boolean,
    default: true,
  },

  google: {
    type: Boolean,
    default: false,
  },
});

module.exports = {};
