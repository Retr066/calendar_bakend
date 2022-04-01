import { Router } from "express";
import { createUser, Login, renovateToken } from "../controllers/authController";
import { check } from "express-validator";
import { fieldsValidator } from "../middlewares/fieldsValidator";
import User from "../models/User";
import { validatorJWT } from "../middlewares/validator-jwt";
const router = Router();
//rutas para auth con el path de host + api/auth
router.post(
  "/new",
  [
    check("fullName")
      .not()
      .isEmpty()
      .withMessage("El nombre completo es obligatorio")
      .isLength({ min: 3, max: 100 })
      .withMessage("El nombre debe ser mayor de 3 caracteres y menor a 100")
      .matches(/^[a-zA-Z]+(\s*[a-zA-Z]*)*[a-zA-Z]+$/)
      .withMessage("El nombre tiene que ser letras no números"),
    check("email")
      .not()
      .isEmpty()
      .withMessage("Es email es obligatorio")
      .isEmail()
      .withMessage("El formato es el incorrecto")
      .custom(async (email) => {
        const emailCheck = await User.findOne({ email });
        if (emailCheck) return Promise.reject();
      })
      .withMessage("Email ya se encuentra en uso"),

    check("password")
      .not()
      .isEmpty()
      .withMessage("Es email es obligatorio")
      .isLength({ min: 6, max: 100 })
      .withMessage("El password debe ser mayor a 6 caracteres y máximo de 100"),
    check("verifyPassword")
      .not()
      .isEmpty()
      .withMessage("La Verificación de password es obligatorio")
      .custom((value, { req }) => {
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
    check("email").not().isEmpty().withMessage("El nombre completo es obligatorio").isEmail().withMessage("El formato es el incorrecto"),
    check("password", "El password debe ser mayor a 6 caracteres").not().isEmpty().isLength({ min: 6 }),
    fieldsValidator,
  ],
  Login
);

router.get("/renew", validatorJWT, renovateToken);

export default router;
