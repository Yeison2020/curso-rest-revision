const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is requiered please"],
  },
  email: {
    type: String,
    required: [true, "Email is requiered please"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is requiered please"],
  },
  image: {
    type: String,
  },

  role: {
    type: String,
    required: true,
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

// ALWAYS WHEN CREATING MY MODEL I NEED TO WRITE IN SINGULAR NO PLURAL
// BUT MONGO DB WILL MAKE PLURAL

module.exports = model("User", UserSchema);
