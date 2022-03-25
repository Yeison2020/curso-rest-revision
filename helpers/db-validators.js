const Role = require("../models/role");
const isRoleValid = async (role = "") => {
  const existeRole = await Role.findOne({ role });
  if (!existeRole) {
    throw new Error(`Your ${role} is not in the DB`);
  }
};

module.exports = {
  isRoleValid,
};
