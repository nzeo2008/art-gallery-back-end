"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const errors_constant_1 = require("./../errors/errors.constant");
class AuthGuard {
    check(req, res, next) {
        if (req.user) {
            return next();
        }
        res.status(errors_constant_1.ERROR_CONSTANTS.FORBIDDEN_STATUS_CODE).send(errors_constant_1.ERROR_CONSTANTS.FORBIDDEN_MESSAGE);
    }
}
exports.AuthGuard = AuthGuard;
