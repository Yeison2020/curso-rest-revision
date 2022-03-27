const { response, request } = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

//
const usuariosGet = async (req = request, res = response) => {
  // How to extract all my Users from database
  // http://localhost:8080/api/usuarios?limit=2&desde=1

  const { limit = 5, desde = 0 } = req.query;

  const query_Not_Active_User = { status: true };

  const users = await User.find(query_Not_Active_User)
    .skip(desde)
    .limit(Number(limit));
  // Recommended way to use Count here
  const total = await User.countDocuments(query_Not_Active_User);
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
    msg: "patch API - usuarios Patch Controller",
  });
};

//
const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "delete API - usuarios Delete Controller",
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
