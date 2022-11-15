"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.UsersService = void 0;
const user_entity_1 = require("./user.entity");
const inversify_1 = require("inversify");
const types_1 = require("./../types");
let UsersService = class UsersService {
    constructor(configService, userRepository) {
        this.configService = configService;
        this.userRepository = userRepository;
    }
    createUser({ email, name, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_entity_1.User(name, email);
            yield user.setPassword(password, this.configService.get('SALT'));
            const result = yield this.findUser(email);
            if (result)
                return null;
            return this.userRepository.create(email, name, user.password);
        });
    }
    findUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.find(email);
        });
    }
    saveEventPost(email, event) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.findUser(email);
            if (!result) {
                return null;
            }
            const { savedEvents } = result;
            savedEvents.push(...event);
            return this.userRepository.saveEventPostToUser(email, savedEvents);
        });
    }
    deleteEventPost(email, alias) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.findUser(email);
            if (!result) {
                return null;
            }
            const updatedEvents = result.savedEvents.filter((event) => event.alias !== alias);
            return this.userRepository.saveEventPostToUser(email, updatedEvents);
        });
    }
    findEventPostByAlias(alias) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findEventPostByAliasFromUser(alias);
        });
    }
    getUserData(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.getUserDataFromDatabase(email);
        });
    }
    validateUser({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExist = yield this.findUser(email);
            if (!userExist) {
                return null;
            }
            const user = new user_entity_1.User(userExist.email, userExist.password);
            const compared = yield user.comparePassword(password, userExist.password);
            if (!compared) {
                return null;
            }
            return userExist;
        });
    }
};
UsersService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ConfigService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.UsersRepository)),
    __metadata("design:paramtypes", [Object, Object])
], UsersService);
exports.UsersService = UsersService;
