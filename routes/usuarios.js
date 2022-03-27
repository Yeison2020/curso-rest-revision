const { Router } = require("express");

// This middleware is comming from express-validator
const { check } = require("express-validator");

// Middleware validators customs
const { validarCampos } = require("../middlewares/validar-campos");

// Helpers Functions

const {
  isRoleValid,
  emailExistes,
  existeUserById,
} = require("../helpers/db-validators");

//

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    check("id", "Not a valid Id Please try again").isMongoId(),
    check("id").custom(existeUserById),
    check("role").custom(isRoleValid),
    validarCampos,
  ],

  usuariosPut
);

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
    check("role").custom(isRoleValid),
    check("email").custom(emailExistes),

    // check("role", "Not a valid role").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validarCampos,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    check("id", "Not a valid Id Please try again").isMongoId(),
    check("id").custom(existeUserById),

    validarCampos,
  ],
  usuariosDelete
);

router.patch("/", usuariosPatch);

module.exports = router;
