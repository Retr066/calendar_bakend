"use strict";
exports.__esModule = true;
exports.fieldsValidator = void 0;
var express_validator_1 = require("express-validator");
var fieldsValidator = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: true,
            errors: errors.mapped()
        });
    }
    next();
};
exports.fieldsValidator = fieldsValidator;
