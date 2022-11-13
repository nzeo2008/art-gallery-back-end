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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const inversify_1 = require("inversify");
const types_1 = require("./types");
const multer_1 = __importDefault(require("multer"));
const auth_middleware_1 = require("./middleware/auth.middleware");
const cors_1 = __importDefault(require("cors"));
require("reflect-metadata");
let App = class App {
    constructor(logger, exceptionHandler, userController, database, eventsController, artistsController, exhibitionsController, configService) {
        this.logger = logger;
        this.exceptionHandler = exceptionHandler;
        this.userController = userController;
        this.database = database;
        this.eventsController = eventsController;
        this.artistsController = artistsController;
        this.exhibitionsController = exhibitionsController;
        this.configService = configService;
        this.port = 3001;
        this.app = (0, express_1.default)();
        this.logger = logger;
    }
    connectToDatabase() {
        this.database.getConnection();
    }
    useValidator() {
        this.app.use((0, multer_1.default)().array('images'));
        const authMiddleware = new auth_middleware_1.AuthMiddleware(this.configService.get('SECRET'));
        this.app.use(authMiddleware.check.bind(authMiddleware));
    }
    useRoutes() {
        this.app.use('/users', this.userController.router.bind(this.userController));
        this.app.use('/events', this.eventsController.router.bind(this.eventsController));
        this.app.use('/exhibitions', this.exhibitionsController.router.bind(this.exhibitionsController));
        this.app.use('/artists', this.artistsController.router.bind(this.artistsController));
    }
    useExceptionHandler() {
        this.app.use(this.exceptionHandler.catch.bind(this.exceptionHandler));
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use((0, cors_1.default)());
            this.useValidator();
            this.useRoutes();
            this.useExceptionHandler();
            this.connectToDatabase();
            this.server = this.app.listen(this.port);
            this.logger.info(`Сервер запущен на http://localhost:${this.port}`);
        });
    }
};
App = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.LoggerService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.ExceptionHandler)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.UsersController)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.DatabaseConnection)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.EventsController)),
    __param(5, (0, inversify_1.inject)(types_1.TYPES.ArtistsController)),
    __param(6, (0, inversify_1.inject)(types_1.TYPES.ExhibitionsController)),
    __param(7, (0, inversify_1.inject)(types_1.TYPES.ConfigService)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object])
], App);
exports.App = App;
