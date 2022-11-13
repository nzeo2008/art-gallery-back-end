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
exports.exhibitionModel = exports.ExhibitionModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const artist_dto_1 = require("./../artists/artist.dto");
class ExhibitionModel {
}
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], ExhibitionModel.prototype, "title", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], ExhibitionModel.prototype, "date", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], ExhibitionModel.prototype, "city", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [artist_dto_1.ArtistDto] }),
    __metadata("design:type", Array)
], ExhibitionModel.prototype, "artists", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], ExhibitionModel.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [String] }),
    __metadata("design:type", Array)
], ExhibitionModel.prototype, "tags", void 0);
__decorate([
    (0, typegoose_1.prop)({ unique: true }),
    __metadata("design:type", String)
], ExhibitionModel.prototype, "alias", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], ExhibitionModel.prototype, "category", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [String] }),
    __metadata("design:type", Array)
], ExhibitionModel.prototype, "images", void 0);
exports.ExhibitionModel = ExhibitionModel;
exports.exhibitionModel = (0, typegoose_1.getModelForClass)(ExhibitionModel);
