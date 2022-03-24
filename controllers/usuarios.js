const { response, request } = require("express");
const User = require("../models/User");
const bcryptjs = require("bcryptjs");

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

  //
  const { name, password, email, role } = req.body;

  const user = new User({
    name,
    password,
    email,
    role,
  });

  // Check If email exist

  // Encriptar Password

  const salt = bcryptjs.genSaltSync(10);
  user.password = bcryptjs.hashSync(password, salt);

  // Save in Database
  console.log(user);
  await user.save();

  res.json(user);
};

//
const usuariosPut = (req, res = response) => {
  const { id } = req.params;

  res.json({
    msg: "put API - usuariosPut",
    id,
  });
};

//
const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

//
const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "delete API - usuariosDelete",
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
