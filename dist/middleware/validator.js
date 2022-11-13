"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const errors_constant_1 = require("../errors/errors.constant");
class Validator {
    constructor(validateInstance) {
        this.validateInstance = validateInstance;
    }
    check({ body }, res, next) {
        const classInstance = (0, class_transformer_1.plainToInstance)(this.validateInstance, body);
        (0, class_validator_1.validate)(classInstance).then((errors) => {
            if (errors.length > 0) {
                res.status(errors_constant_1.ERROR_CONSTANTS.COMMON_ERROR_422_STATUS_CODE).send(errors);
            }
            else
                next();
        });
    }
}
exports.Validator = Validator;
