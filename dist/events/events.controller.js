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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsController = void 0;
const inversify_1 = require("inversify");
const controller_1 = require("../common/controller");
const types_1 = require("../types");
const event_dto_1 = require("./event.dto");
const http_error_1 = require("../errors/http.error");
const errors_constant_1 = require("./../errors/errors.constant");
const validator_1 = require("../middleware/validator");
const statuscode_constants_1 = require("./../common/statuscode.constants");
const auth_guard_1 = require("../middleware/auth.guard");
require("reflect-metadata");
let EventsController = class EventsController extends controller_1.Controller {
    constructor(logger, eventsService, imagesController) {
        super(logger);
        this.eventsService = eventsService;
        this.imagesController = imagesController;
        this.routes([
            {
                path: '/createEvent',
                method: 'post',
                func: this.create,
                validators: [new validator_1.Validator(event_dto_1.EventDto), new auth_guard_1.AuthGuard()],
            },
            {
                path: '/searchEvent',
                method: 'get',
                func: this.search,
                validators: [],
            },
            {
                path: '/updateEvent',
                method: 'patch',
                func: this.update,
                validators: [new validator_1.Validator(event_dto_1.EventDto), new auth_guard_1.AuthGuard()],
            },
            {
                path: '/deleteEvent',
                method: 'delete',
                func: this.delete,
                validators: [new auth_guard_1.AuthGuard()],
            },
        ]);
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.files === undefined) {
                return this.send(res, errors_constant_1.ERROR_CONSTANTS.COMMON_ERROR_422_STATUS_CODE, 'Не удалось загрузить изображения');
            }
            const files = req.files;
            const result = yield this.eventsService.createEvent(req.body, files);
            if (!result) {
                return next((0, http_error_1.createNewError)('createEvent', errors_constant_1.ERROR_CONSTANTS.COMMON_ERROR_422_STATUS_CODE, errors_constant_1.ERROR_CONSTANTS.CREATE_EVENT_ERROR));
            }
            this.send(res, statuscode_constants_1.COMMON_STATUS_CODES.CREATED_STATUS_CODE, result);
        });
    }
    search({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.eventsService.findEventByTitle(body.title);
            if (!result) {
                return this.send(res, errors_constant_1.ERROR_CONSTANTS.NOT_FOUND_STATUS_CODE, null);
            }
            this.send(res, statuscode_constants_1.COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, result);
        });
    }
    update({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = body, dto = __rest(body, ["_id"]);
            const updatedEvent = yield this.eventsService.updateEventById(_id, dto);
            if (!updatedEvent) {
                return next((0, http_error_1.createNewError)('updateEvent', errors_constant_1.ERROR_CONSTANTS.NOT_FOUND_STATUS_CODE, errors_constant_1.ERROR_CONSTANTS.EVENT_NOT_FOUND_MESSAGE));
            }
            this.send(res, statuscode_constants_1.COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, updatedEvent);
        });
    }
    delete({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedEvent = yield this.eventsService.deleteEventById(body._id);
            if (!deletedEvent) {
                return next((0, http_error_1.createNewError)('deleteEvent', errors_constant_1.ERROR_CONSTANTS.NOT_FOUND_STATUS_CODE, errors_constant_1.ERROR_CONSTANTS.EVENT_NOT_FOUND_MESSAGE));
            }
            const result = yield this.imagesController.deleteImages(deletedEvent.images);
            this.send(res, statuscode_constants_1.COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, {});
            if (result) {
                return this.logger.info('[deleteEvent] Событие и файлы успешно удалены');
            }
            this.logger.info('[deleteEvent] Событие удалено, файлы изображений не найдены');
        });
    }
};
EventsController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.LoggerService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.EventsService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.ImagesController)),
    __metadata("design:paramtypes", [Object, Object, Object])
], EventsController);
exports.EventsController = EventsController;
