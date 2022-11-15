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
exports.EventsService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("./../types");
let EventsService = class EventsService {
    constructor(eventsRepository) {
        this.eventsRepository = eventsRepository;
    }
    createEvent(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.eventsRepository.createEventPost(body);
        });
    }
    findEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.eventsRepository.findEventPostById(id);
        });
    }
    findEventByAlias(alias) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.eventsRepository.findEventPostByAlias(alias);
        });
    }
    findEventByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.eventsRepository.findEventPostByTitle(title);
        });
    }
    findEventsByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.eventsRepository.findEventPostsByCategory(category);
        });
    }
    updateEventById(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.eventsRepository.updateEventPostById(id, dto);
        });
    }
    deleteEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.eventsRepository.deleteEventPostById(id);
        });
    }
};
EventsService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.EventsRepository)),
    __metadata("design:paramtypes", [Object])
], EventsService);
exports.EventsService = EventsService;
