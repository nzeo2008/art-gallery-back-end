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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcryptjs_1 = require("bcryptjs");
class User {
    constructor(_name, _email) {
        this._name = _name;
        this._email = _email;
    }
    get name() {
        return this._name;
    }
    get email() {
        return this._email;
    }
    get password() {
        return this._password;
    }
    setPassword(password, salt) {
        return __awaiter(this, void 0, void 0, function* () {
            this._password = yield (0, bcryptjs_1.hash)(password, Number(salt));
        });
    }
    comparePassword(password, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, bcryptjs_1.compare)(password, hashedPassword);
        });
    }
}
exports.User = User;
