"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UsersController = void 0;
const controller_1 = require("../common/controller");
const inversify_1 = require("inversify");
const types_1 = require("./../types");
const user_register_dto_1 = require("./dto/user-register.dto");
const errors_constant_1 = require("./../errors/errors.constant");
const jwt = __importStar(require("jsonwebtoken"));
const validator_1 = require("../middleware/validator");
const user_login_dto_1 = require("./dto/user-login.dto");
const statuscode_constants_1 = require("../common/statuscode.constants");
require("reflect-metadata");
let UsersController = class UsersController extends controller_1.Controller {
    constructor(logger, userService, configService) {
        super(logger);
        this.userService = userService;
        this.configService = configService;
        this.getJWT = (isAdmin, email, secret) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => jwt.sign({
                email,
                iat: Math.floor(Date.now() / 1000),
                isAdmin,
            }, secret, { algorithm: 'HS256', expiresIn: '7d' }, (error, token) => {
                if (error) {
                    this.logger.error(`Ошибка при подписи JWT: ${error.name}`);
                    reject(error);
                }
                resolve(token);
            }));
        });
        this.routes([
            {
                path: '/login',
                method: 'post',
                func: this.login,
                validators: [new validator_1.Validator(user_login_dto_1.UserLoginDto)],
            },
            {
                path: '/register',
                method: 'post',
                func: this.register,
                validators: [new validator_1.Validator(user_register_dto_1.UserRegisterDto)],
            },
        ]);
    }
    login({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userService.validateUser(body);
            if (!result) {
                return next(res
                    .status(errors_constant_1.ERROR_CONSTANTS.USER_DOES_NOT_EXIST_STATUS_CODE)
                    .send(errors_constant_1.ERROR_CONSTANTS.USER_DOES_NOT_EXIST_MESSAGE));
            }
            const jwt = yield this.getJWT(result.isAdmin, body.email, this.configService.get('SECRET'));
            return this.send(res, statuscode_constants_1.COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, { jwt });
        });
    }
    register({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userService.createUser(body);
            if (!result) {
                return next(res
                    .status(errors_constant_1.ERROR_CONSTANTS.ALREADY_EXIST_STATUS_CODE)
                    .send(errors_constant_1.ERROR_CONSTANTS.ALREADY_EXIST_MESSAGE));
            }
            return this.send(res, statuscode_constants_1.COMMON_STATUS_CODES.CREATED_STATUS_CODE, result);
        });
    }
};
UsersController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.LoggerService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.UsersService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.ConfigService)),
    __metadata("design:paramtypes", [Object, Object, Object])
], UsersController);
exports.UsersController = UsersController;
