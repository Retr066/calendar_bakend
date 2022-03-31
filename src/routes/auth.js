"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var authController_1 = require("../controllers/authController");
var express_validator_1 = require("express-validator");
var fieldsValidator_1 = require("../middlewares/fieldsValidator");
var User_1 = require("../models/User");
var validator_jwt_1 = require("../middlewares/validator-jwt");
var router = (0, express_1.Router)();
//rutas para auth con el path de host + api/auth
router.post("/new", [
    (0, express_validator_1.check)("fullName")
        .not()
        .isEmpty()
        .isString()
        .withMessage("El nombre completo es obligatorio")
        .isLength({ min: 3, max: 100 })
        .withMessage("El nombre debe ser mayor de 3 caracteres y menor a 100")
        .matches(/^[a-zA-Z]+(\s*[a-zA-Z]*)*[a-zA-Z]+$/)
        .withMessage("El nombre tiene que ser letras no números"),
    (0, express_validator_1.check)("email")
        .isEmail()
        .withMessage("Es email es obligatorio")
        .custom(function (email) { return __awaiter(void 0, void 0, void 0, function () {
        var emailCheck;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User_1["default"].findOne({ email: email })];
                case 1:
                    emailCheck = _a.sent();
                    if (emailCheck)
                        return [2 /*return*/, Promise.reject()];
                    return [2 /*return*/];
            }
        });
    }); })
        .withMessage("Email ya se encuentra en uso"),
    (0, express_validator_1.check)("password", "El password debe ser mayor a 6 caracteres y máximo de 100").isLength({ min: 6, max: 100 }),
    (0, express_validator_1.check)("verifyPassword").custom(function (value, _a) {
        var req = _a.req;
        if (value !== req.body.password) {
            throw new Error("La confirmación de la contraseña no coincide con la contraseña");
        }
        return true;
    }),
    fieldsValidator_1.fieldsValidator,
], authController_1.createUser);
router.post("/", [
    (0, express_validator_1.check)("email", "Es email es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "El password debe ser mayor a 6 caracteres").isLength({ min: 6 }),
    fieldsValidator_1.fieldsValidator,
], authController_1.Login);
router.get("/renew", validator_jwt_1.validatorJWT, authController_1.renovateToken);
exports["default"] = router;