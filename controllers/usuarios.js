const { response, request } = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

//
const usuariosGet = async (req = request, res = response) => {
  // How to extract all my Users from database
  // http://localhost:8080/api/usuarios?limit=2&desde=1

  const { limit = 5, desde = 0 } = req.query;

  const query_Not_Active_User = { status: true };

  // I need to fix await on differents: DONT PUT TWO AWAIT AFTER ANOTHER

  // const users = await User.find(query_Not_Active_User)
  //   .skip(desde)
  //   .limit(Number(limit));

  // const total = await User.countDocuments(query_Not_Active_User);\

  // Best wait of calling two promises

  const [total, users] = await Promise.all([
    User.countDocuments(query_Not_Active_User),
    User.find(query_Not_Active_User),
  ]);
  res.json({
    total,
    users,
  });
};

//

const usuariosPost = async (req, res = response) => {
  // How to exclude elements
  // const { google, ...restosElements } = req.body;
  // const user = new User(restosElements);

  // Validate Emails

  //
  const { name, password, email, role } = req.body;

  const user = new User({
    name,
    password,
    email,
    role,
  });

  // Encriptar Password

  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(password, salt);

  // Save in Database
  console.log(user);
  await user.save();

  res.json({ user });
};

//
const usuariosPut = async (req, res = response) => {
  const { id } = req.params;

  // This is extracting those elments from here and means that they can not be update here

  // Meaning here we can not update password, google, email
  const { password, google, email, ...resto } = req.body;

  // Validar contra database

  if (password) {
    const salt = bcrypt.genSaltSync(10);
    resto.password = bcrypt.hashSync(password, salt);
  }
  // Important here
  const userDB = await User.findByIdAndUpdate(id, resto);

  res.json(userDB);
};

//
const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuarios Patch Controller Need to be upates",
  });
};

//
const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;

  // delete  users
  // const user = await User.findByIdAndDelete(id);

  // Always recommended is to change the statuc of the User just in case the users have created information attached to this user

  // I will change the status of the User how will be Unactive

  const user = await User.findByIdAndUpdate(id, { status: false });

  res.json({
    msg: "delete API - usuarios Delete Controller Return Deleted but just changed It's status",
    user,
  });
};

//
module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
