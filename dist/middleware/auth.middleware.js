"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthMiddleware {
    constructor(secret) {
        this.secret = secret;
    }
    check(req, res, next) {
        if (req.headers.authorization) {
            (0, jsonwebtoken_1.verify)(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
                if (err) {
                    next();
                }
                else if (payload) {
                    const myPayload = payload;
                    req.user = myPayload.isAdmin;
                    next();
                }
            });
        }
        else {
            next();
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
