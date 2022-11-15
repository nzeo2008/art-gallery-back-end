"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.ImagesService = void 0;
const inversify_1 = require("inversify");
const fs_extra_1 = require("fs-extra");
const app_root_path_1 = require("app-root-path");
require("reflect-metadata");
let ImagesService = class ImagesService {
    constructor() {
        this.basePath = `${app_root_path_1.path}/src/images/images-folder/`;
    }
    saveEventsImages(body, files, from) {
        return __awaiter(this, void 0, void 0, function* () {
            const uploadFolder = this.basePath + `${from}/${body.alias}`;
            yield (0, fs_extra_1.ensureDir)(uploadFolder);
            const result = [];
            for (const file of files) {
                yield (0, fs_extra_1.writeFile)(`${uploadFolder}/${file.originalname}`, file.buffer);
                result.push(`${from}/${body.alias}/${file.originalname}`);
            }
            return result;
        });
    }
    saveExhibitionsImages(body, files, from) {
        return __awaiter(this, void 0, void 0, function* () {
            const uploadFolder = this.basePath + `${from}/${body.alias}`;
            yield (0, fs_extra_1.ensureDir)(uploadFolder);
            const result = [];
            for (const file of files) {
                yield (0, fs_extra_1.writeFile)(`${uploadFolder}/${file.originalname}`, file.buffer);
                result.push(`${from}/${body.alias}/${file.originalname}`);
            }
            return result;
        });
    }
    saveArtistsImages(body, files, from) {
        return __awaiter(this, void 0, void 0, function* () {
            const fullname = body.name + body.surname + `(${body.nickname})`;
            const uploadFolder = this.basePath + `${from}/${fullname}`;
            yield (0, fs_extra_1.ensureDir)(uploadFolder);
            const images = [];
            let avatar = '';
            for (const file of files) {
                if (file.originalname.replace(/\.[^/.]+$/, '').toLowerCase() === 'avatar') {
                    yield (0, fs_extra_1.ensureDir)(`${uploadFolder}/Avatar/`);
                    yield (0, fs_extra_1.writeFile)(`${uploadFolder}/Avatar/${file.originalname}`, file.buffer);
                    avatar = `${from}/${fullname}/Avatar/${file.originalname}`;
                }
                else {
                    yield (0, fs_extra_1.writeFile)(`${uploadFolder}/${file.originalname}`, file.buffer);
                    images.push(`${from}/${fullname}/${file.originalname}`);
                }
            }
            return { avatar: avatar, images: images };
        });
    }
    deleteImagesFolder(images) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!images || images.length === 0)
                return false;
            const indexOfString = images[0].lastIndexOf('/');
            const imagesFolder = this.basePath + images[0].substring(0, indexOfString);
            try {
                (0, fs_extra_1.rmSync)(imagesFolder, { recursive: true, force: true });
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
};
ImagesService = __decorate([
    (0, inversify_1.injectable)()
], ImagesService);
exports.ImagesService = ImagesService;
