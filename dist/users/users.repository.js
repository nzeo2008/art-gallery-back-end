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
exports.UsersRepository = void 0;
const user_model_1 = require("./user.model");
const inversify_1 = require("inversify");
require("reflect-metadata");
let UsersRepository = class UsersRepository {
    constructor() { }
    create(email, name, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.userModel.create({ email, name, password: hashedPassword });
        });
    }
    find(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.userModel.findOne({ email });
        });
    }
    saveEventPostToUser(email, savedEvents) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.userModel.findOneAndUpdate({ email }, { $set: { savedEvents } }, { new: true }).exec();
        });
    }
    deleteEventPostFromUser(email, savedEvents) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.userModel.findOneAndUpdate({ email }, { $set: { savedEvents } }, { new: true }).exec();
        });
    }
    getUserDataFromDatabase(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.userModel.findOne({ email }, { savedEvents: 1, email: 1, name: 1, registerDate: 1 });
        });
    }
    findEventPostByAliasFromUser(alias) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.userModel.findOne({ 'savedEvents.alias': alias }, { savedEvents: 1 }).exec();
        });
    }
};
UsersRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], UsersRepository);
exports.UsersRepository = UsersRepository;
