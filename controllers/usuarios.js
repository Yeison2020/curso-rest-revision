const { response, request } = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

//
const usuariosGet = (req = request, res = response) => {
  const { q, nombre = "No name", apikey, page = 1, limit } = req.query;
  res.json({
    msg: "get API - controlador",
    q,
    nombre,
    apikey,
    page,
    limit,
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
  const { password, google, email, ...resto } = req.body;

  // Validar contra database

  if (password) {
    const salt = bcrypt.genSaltSync(10);
    resto.password = bcrypt.hashSync(password, salt);
  }
  // Important here
  const userDB = await User.findByIdAndUpdate(id, resto);

  res.json({
    msg: "put API - usuarios Put Controller",
    userDB,
  });
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
