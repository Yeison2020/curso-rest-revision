const { Router } = require("express");
const { validarCampos } = require("../middlewares/validar-campos");

const Role = require("../models/role");

// This middleware is comming from express-validator
const { check } = require("express-validator");

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id", usuariosPut);

// The router takes three arguments 1. path default 2. middleware 3. function Controller

// This middleware will send errors to my request and there I need to check If I got any errors from the
// Check and If yes I need to return those errors on my on format
// Adding validations
router.post(
  "/",
  [
    check("name", "Your Email format incorrect").not().isEmpty(),
    check("email", "Your name is requiered").isEmail(),
    check("password", "Should contain more 6 letters").isLength({ min: 6 }),
    check("role").custom(async (role = "") => {
      const existeRole = await Role.findOne({ role });
      if (!existeRole) {
        throw new Error(`Your ${role} is not in the DB`);
      }
    }),
    // check("role", "Not a valid role").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validarCampos,
  ],
  usuariosPost
);

router.delete("/", usuariosDelete);

router.patch("/", usuariosPatch);

module.exports = router;
