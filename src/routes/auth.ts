import { Router } from "express";
import { createUser, Login, renovateToken } from "../controllers/authController";
import { check } from "express-validator";
import { fieldsValidator } from "../middlewares/fieldsValidator";
import User from "../models/User";
const router = Router();
//rutas para auth con el path de host + api/auth
router.post(
  "/new",
  [
    check("fullName")
      .not()
      .isEmpty()
      .isString()
      .withMessage("El nombre completo es obligatorio")
      .isLength({ min: 3, max: 100 })
      .withMessage("El nombre debe ser mayor de 3 caracteres y menor a 100")
      .matches(/^[a-zA-Z]+(\s*[a-zA-Z]*)*[a-zA-Z]+$/)
      .withMessage("El nombre tiene que ser letras no números"),
    check("email")
      .isEmail()
      .withMessage("Es email es obligatorio")
      .custom(async (email) => {
        User.findOne({ email }).then((user) => {
          if (user) return Promise.reject();
        });
      })
      .withMessage("Email ya se encuentra en uso"),

    check("password", "El password debe ser mayor a 6 caracteres y máximo de 100").isLength({ min: 6, max: 100 }),
    check("verifyPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("La confirmación de la contraseña no coincide con la contraseña");
      }
      return true;
    }),
    fieldsValidator,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "Es email es obligatorio").isEmail(),
    check("password", "El password debe ser mayor a 6 caracteres").isLength({ min: 6 }),
    fieldsValidator,
  ],
  Login
);

router.get("/renew", renovateToken);

export default router;
