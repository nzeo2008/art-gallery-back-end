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
exports.ArtistsRepository = void 0;
const artist_model_1 = require("./artist.model");
const inversify_1 = require("inversify");
require("reflect-metadata");
let ArtistsRepository = class ArtistsRepository {
    createArtistBody(body) {
        return artist_model_1.artistModel.create(body);
    }
    findArtistBodyById(id) {
        return artist_model_1.artistModel.findById(id).exec();
    }
    updateArtistBodyById(id, dto) {
        return artist_model_1.artistModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }
    deleteArtistBodyById(id) {
        return artist_model_1.artistModel.findByIdAndDelete(id).exec();
    }
    findArtistBodyByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return artist_model_1.artistModel
                .find({
                name: { $regex: `${name}` },
            })
                .exec();
        });
    }
    findArtistsBodyByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            return artist_model_1.artistModel
                .find({
                category,
            })
                .exec();
        });
    }
    findArtistsBodyByTags(tags) {
        return __awaiter(this, void 0, void 0, function* () {
            return artist_model_1.artistModel
                .find({
                tags,
            })
                .exec();
        });
    }
};
ArtistsRepository = __decorate([
    (0, inversify_1.injectable)()
], ArtistsRepository);
exports.ArtistsRepository = ArtistsRepository;
