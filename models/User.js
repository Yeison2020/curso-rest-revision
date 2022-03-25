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
    enum: ["ADMIN_ROLE", "USER_ROLE", "VENTAS_ROLE"],
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

// OVERWRITE METHODS IN MY MODEL

// Notes It's to be a regular function
// This is like a serializer in nodeJS extracting values that I do not need to be render. So Important Check it our and learn it well.
UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

// ALWAYS WHEN CREATING MY MODEL I NEED TO WRITE IN SINGULAR NO PLURAL
// BUT MONGO DB WILL MAKE PLURAL

module.exports = model("User", UserSchema);
