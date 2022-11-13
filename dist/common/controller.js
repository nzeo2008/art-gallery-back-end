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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const express_1 = require("express");
const inversify_1 = require("inversify");
require("reflect-metadata");
let Controller = class Controller {
    constructor(logger) {
        this._router = (0, express_1.Router)();
        this.logger = logger;
    }
    get router() {
        return this._router;
    }
    send(res, code, message) {
        return res.type('application/json').status(code).json(message);
    }
    routes(routes) {
        var _a;
        for (const route of routes) {
            this.logger.info(`${route.method}: ${route.path}`);
            const handler = route.func.bind(this);
            const validators = (_a = route.validators) === null || _a === void 0 ? void 0 : _a.map((validator) => {
                return validator.check.bind(validator);
            });
            const pipeline = validators ? [...validators, handler] : handler;
            this.router[route.method](route.path, pipeline);
        }
    }
};
Controller = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [Object])
], Controller);
exports.Controller = Controller;
