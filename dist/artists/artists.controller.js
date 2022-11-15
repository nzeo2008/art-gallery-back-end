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
exports.ArtistsController = void 0;
const inversify_1 = require("inversify");
const controller_1 = require("../common/controller");
const types_1 = require("../types");
const http_error_1 = require("../errors/http.error");
const errors_constant_1 = require("./../errors/errors.constant");
const validator_1 = require("../middleware/validator");
const statuscode_constants_1 = require("./../common/statuscode.constants");
const artist_dto_1 = require("./artist.dto");
const auth_guard_1 = require("../middleware/auth.guard");
require("reflect-metadata");
let ArtistsController = class ArtistsController extends controller_1.Controller {
    constructor(logger, artistsService, imagesController) {
        super(logger);
        this.artistsService = artistsService;
        this.imagesController = imagesController;
        this.routes([
            {
                path: '/create-artist',
                method: 'post',
                func: this.create,
                validators: [new validator_1.Validator(artist_dto_1.ArtistDto), new auth_guard_1.AuthGuard()],
            },
            {
                path: '/search-artist',
                method: 'get',
                func: this.search,
                validators: [],
            },
            {
                path: '/search-category',
                method: 'get',
                func: this.searchByCategory,
                validators: [],
            },
            {
                path: '/search-tags',
                method: 'get',
                func: this.searchByTags,
                validators: [],
            },
            {
                path: '/update-artist',
                method: 'patch',
                func: this.update,
                validators: [new validator_1.Validator(artist_dto_1.ArtistDto), new auth_guard_1.AuthGuard()],
            },
            {
                path: '/delete-artist',
                method: 'delete',
                func: this.delete,
                validators: [new auth_guard_1.AuthGuard()],
            },
        ]);
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.files === undefined) {
                return this.send(res, errors_constant_1.ERROR_CONSTANTS.COMMON_ERROR_422_STATUS_CODE, errors_constant_1.ERROR_CONSTANTS.CREATE_ARTIST_ERROR);
            }
            const files = req.files;
            const paths = yield this.imagesController.uploadImagesToArtists(req.body, files);
            const body = Object.assign(Object.assign({}, req.body), paths);
            const result = yield this.artistsService.createArtist(body);
            if (!result) {
                return next((0, http_error_1.createNewError)('create-artist', errors_constant_1.ERROR_CONSTANTS.COMMON_ERROR_422_STATUS_CODE, errors_constant_1.ERROR_CONSTANTS.CREATE_ARTIST_ERROR));
            }
            this.send(res, statuscode_constants_1.COMMON_STATUS_CODES.CREATED_STATUS_CODE, result);
        });
    }
    search({ query }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const artists = yield this.artistsService.findArtistByName(query.name);
            if (!artists) {
                return this.send(res, errors_constant_1.ERROR_CONSTANTS.NOT_FOUND_STATUS_CODE, null);
            }
            this.send(res, statuscode_constants_1.COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, artists);
        });
    }
    searchByCategory({ query }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const artists = yield this.artistsService.findArtistsByCategory(query.category);
            if (!artists) {
                return this.send(res, errors_constant_1.ERROR_CONSTANTS.NOT_FOUND_STATUS_CODE, null);
            }
            this.send(res, statuscode_constants_1.COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, artists);
        });
    }
    searchByTags({ query }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const artists = yield this.artistsService.findArtistsByTags(query.tags);
            if (!artists) {
                return this.send(res, errors_constant_1.ERROR_CONSTANTS.NOT_FOUND_STATUS_CODE, null);
            }
            this.send(res, statuscode_constants_1.COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, artists);
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.files === undefined) {
                return this.send(res, errors_constant_1.ERROR_CONSTANTS.COMMON_ERROR_422_STATUS_CODE, errors_constant_1.ERROR_CONSTANTS.CREATE_IMAGES_ERROR);
            }
            const files = req.files;
            const _a = req.body, { _id } = _a, dto = __rest(_a, ["_id"]);
            const findArtistResult = yield this.artistsService.findArtistById(_id);
            if (!findArtistResult) {
                return next((0, http_error_1.createNewError)('update-artist', errors_constant_1.ERROR_CONSTANTS.NOT_FOUND_STATUS_CODE, errors_constant_1.ERROR_CONSTANTS.ARTIST_NOT_FOUND_MESSAGE));
            }
            if (findArtistResult.images.length === 0 && files.length !== 0) {
                const paths = yield this.imagesController.uploadImagesToArtists(req.body, files);
                const artist = Object.assign(Object.assign({}, dto), paths);
                const updatedArtist = yield this.artistsService.updateArtistById(_id, artist);
                return this.send(res, statuscode_constants_1.COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, updatedArtist);
            }
            const result = yield this.imagesController.deleteImages(findArtistResult.images);
            if (!result) {
                return next((0, http_error_1.createNewError)('update-artist', errors_constant_1.ERROR_CONSTANTS.CONFLICT_STATUS_CODE, errors_constant_1.ERROR_CONSTANTS.DELETE_CONFLICT_MESSAGE));
            }
            const paths = yield this.imagesController.uploadImagesToArtists(req.body, files);
            const artist = Object.assign(Object.assign({}, dto), paths);
            const updatedArtist = yield this.artistsService.updateArtistById(_id, artist);
            this.send(res, statuscode_constants_1.COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, updatedArtist);
        });
    }
    delete({ query }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = query._id;
            const findArtist = yield this.artistsService.findArtistById(id);
            if (!findArtist) {
                return next((0, http_error_1.createNewError)('delete-artist', errors_constant_1.ERROR_CONSTANTS.NOT_FOUND_STATUS_CODE, errors_constant_1.ERROR_CONSTANTS.ARTIST_NOT_FOUND_MESSAGE));
            }
            if (findArtist.images.length === 0) {
                yield this.artistsService.deleteArtistById(id);
                return this.send(res, statuscode_constants_1.COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, {});
            }
            const result = yield this.imagesController.deleteImages(findArtist.images);
            if (!result) {
                return next((0, http_error_1.createNewError)('delete-artist', errors_constant_1.ERROR_CONSTANTS.CONFLICT_STATUS_CODE, errors_constant_1.ERROR_CONSTANTS.DELETE_CONFLICT_MESSAGE));
            }
            yield this.artistsService.deleteArtistById(id);
            this.send(res, statuscode_constants_1.COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, {});
        });
    }
};
ArtistsController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.LoggerService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.ArtistsService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.ImagesController)),
    __metadata("design:paramtypes", [Object, Object, Object])
], ArtistsController);
exports.ArtistsController = ArtistsController;
