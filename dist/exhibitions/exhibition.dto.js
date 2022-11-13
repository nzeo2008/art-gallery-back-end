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
exports.ExhibitionDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const artist_dto_1 = require("./../artists/artist.dto");
class ExhibitionDto {
}
__decorate([
    (0, class_validator_1.MaxLength)(50, { message: 'Максимальное число знаков не может быть больше $constraint1' }),
    (0, class_validator_1.MinLength)(2, { message: 'Минимальное число знаков не может быть меньше $constraint1' }),
    (0, class_validator_1.IsString)({ message: 'Неверный тип данных, требуется string' }),
    __metadata("design:type", String)
], ExhibitionDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsDateString)('', { message: 'Неверный тип даты и времени' }),
    __metadata("design:type", Date)
], ExhibitionDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(30, { message: 'Максимальное число знаков не может быть больше $constraint1' }),
    (0, class_validator_1.MinLength)(2, { message: 'Минимальное число знаков не может быть меньше $constraint1' }),
    (0, class_validator_1.IsString)({ message: 'Неверный тип данных, требуется string' }),
    __metadata("design:type", String)
], ExhibitionDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'Неверный тип данных, требуется массив' }),
    (0, class_validator_1.ValidateNested)({ each: true, message: 'Неверный тип DTO' }),
    (0, class_transformer_1.Type)(() => artist_dto_1.ArtistDto),
    __metadata("design:type", Array)
], ExhibitionDto.prototype, "artists", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(1024, { message: 'Максимальное число знаков не может быть больше $constraint1' }),
    (0, class_validator_1.MinLength)(30, { message: 'Минимальное число знаков не может быть меньше $constraint1' }),
    (0, class_validator_1.IsString)({ message: 'Неверный тип данных, требуется string' }),
    __metadata("design:type", String)
], ExhibitionDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.ArrayMaxSize)(30, { message: 'Максимальное число элементов массива не может быть больше $constraint1' }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'Минимальное число элементов массива не может быть меньше $constraint1' }),
    (0, class_validator_1.MaxLength)(30, { each: true, message: 'Максимальное число знаков не может быть больше $constraint1' }),
    (0, class_validator_1.MinLength)(1, { each: true, message: 'Минимальное число знаков не может быть меньше $constraint1' }),
    (0, class_validator_1.IsArray)({ message: 'Требуется массив' }),
    (0, class_validator_1.IsString)({ each: true, message: 'Неверный тип данных, требуется string' }),
    __metadata("design:type", Array)
], ExhibitionDto.prototype, "tags", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(30, { message: 'Максимальное число знаков не может быть больше $constraint1' }),
    (0, class_validator_1.MinLength)(2, { message: 'Минимальное число знаков не может быть меньше $constraint1' }),
    (0, class_validator_1.IsString)({ message: 'Неверный тип данных, требуется string' }),
    __metadata("design:type", String)
], ExhibitionDto.prototype, "alias", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(30, { message: 'Максимальное число знаков не может быть больше $constraint1' }),
    (0, class_validator_1.MinLength)(2, { message: 'Минимальное число знаков не может быть меньше $constraint1' }),
    (0, class_validator_1.IsString)({ message: 'Неверный тип данных, требуется string' }),
    __metadata("design:type", String)
], ExhibitionDto.prototype, "category", void 0);
exports.ExhibitionDto = ExhibitionDto;
