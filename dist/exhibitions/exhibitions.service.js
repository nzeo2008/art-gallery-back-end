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
exports.ExhibitionsService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../types");
let ExhibitionsService = class ExhibitionsService {
    constructor(exhibitionsRepository, imagesController) {
        this.exhibitionsRepository = exhibitionsRepository;
        this.imagesController = imagesController;
    }
    createExhibition(body, files) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.findExhibitionByAlias(body.alias);
            const paths = yield this.imagesController.uploadImagesToExhibitions(body, files);
            if (!result) {
                return this.exhibitionsRepository.createExhibitionPost(body, paths);
            }
            return null;
        });
    }
    findExhibitionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exhibitionsRepository.findExhibitionPostById(id);
        });
    }
    findExhibitionByAlias(alias) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exhibitionsRepository.findExhibitionPostByAlias(alias);
        });
    }
    findExhibitionByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exhibitionsRepository.findExhibitionPostByTitle(title);
        });
    }
    updateExhibitionById(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exhibitionsRepository.updateExhibitionPostById(id, dto);
        });
    }
    deleteExhibitionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exhibitionsRepository.deleteExhibitionPostById(id);
        });
    }
};
ExhibitionsService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ExhibitionsRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.ImagesController)),
    __metadata("design:paramtypes", [Object, Object])
], ExhibitionsService);
exports.ExhibitionsService = ExhibitionsService;
