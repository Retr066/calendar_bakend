import { Router } from "express";
import { check } from "express-validator";
import { createdEvent, deletedEvent, getEvents, updatedEvent } from "../controllers/eventController";
import { fieldsValidator } from "../middlewares/fieldsValidator";
import { validatorJWT } from "../middlewares/validator-jwt";
import { isDate } from "../utils/isDate";

const router = Router();
router.use(validatorJWT);
router.get("/", getEvents);

router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("notes", "Las notas son obligatorias").not().isEmpty(),
    check("start", "La fecha de inicio es obligatorio").not().isEmpty().custom(isDate),
    check("end", "La fecha de final es obligatorio").not().isEmpty().custom(isDate),
    fieldsValidator,
  ],
  createdEvent
);

router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("notes", "Las notas son obligatorias").not().isEmpty(),
    check("start", "La fecha de inicio es obligatorio").not().isEmpty().custom(isDate),
    check("end", "La fecha de final es obligatorio").not().isEmpty().custom(isDate),
    fieldsValidator,
  ],
  updatedEvent
);

router.delete("/:id", deletedEvent);

export default router;
