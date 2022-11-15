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
exports.EventDto = void 0;
const class_validator_1 = require("class-validator");
class EventDto {
}
__decorate([
    (0, class_validator_1.MaxLength)(50, { message: 'Максимальное число знаков не может быть больше $constraint1' }),
    (0, class_validator_1.MinLength)(2, { message: 'Минимальное число знаков не может быть меньше $constraint1' }),
    (0, class_validator_1.IsString)({ message: 'Неверный тип данных, требуется string' }),
    __metadata("design:type", String)
], EventDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(5024, { message: 'Максимальное число знаков не может быть больше $constraint1' }),
    (0, class_validator_1.MinLength)(30, { message: 'Минимальное число знаков не может быть меньше $constraint1' }),
    (0, class_validator_1.IsString)({ message: 'Неверный тип данных, требуется string' }),
    __metadata("design:type", String)
], EventDto.prototype, "article", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({ message: 'Некорректный тип даты и времени' }),
    __metadata("design:type", Date)
], EventDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(30, { message: 'Максимальное число знаков не может быть больше $constraint1' }),
    (0, class_validator_1.MinLength)(2, { message: 'Минимальное число знаков не может быть меньше $constraint1' }),
    (0, class_validator_1.IsString)({ message: 'Неверный тип данных, требуется string' }),
    __metadata("design:type", String)
], EventDto.prototype, "alias", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(30, { message: 'Максимальное число знаков не может быть больше $constraint1' }),
    (0, class_validator_1.MinLength)(2, { message: 'Минимальное число знаков не может быть меньше $constraint1' }),
    (0, class_validator_1.IsString)({ message: 'Неверный тип данных, требуется string' }),
    __metadata("design:type", String)
], EventDto.prototype, "category", void 0);
exports.EventDto = EventDto;
