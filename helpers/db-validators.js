const Role = require("../models/role");
const User = require("../models/User");

const isRoleValid = async (role = "") => {
  const existeRole = await Role.findOne({ role });
  if (!existeRole) {
    throw new Error(`Your ${role} is not in the DB`);
  }
};

const emailExistes = async (email = "") => {
  // Why errors I need to pass to this function the elements that check will pass into it.
  const emailExiste = await User.findOne({ email: email });
  if (emailExiste) {
    throw new Error("This email already exist in the db Please choose another");
  }
};

module.exports = {
  isRoleValid,
  emailExistes,
};
