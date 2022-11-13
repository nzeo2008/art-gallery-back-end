import {
	IsArray,
	IsDateString,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
	ValidateNested,
	ArrayMaxSize,
	ArrayMinSize,
	ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ArtistDto } from './../artists/artist.dto';

export class ExhibitionDto {
	@MaxLength(50, { message: 'Максимальное число знаков не может быть больше $constraint1' })
	@MinLength(2, { message: 'Минимальное число знаков не может быть меньше $constraint1' })
	@IsString({ message: 'Неверный тип данных, требуется string' })
	title: string;

	@IsDateString('', { message: 'Неверный тип даты и времени' })
	startDate: Date;

	@IsDateString('', { message: 'Неверный тип даты и времени' })
	endDate: Date;

	@MaxLength(30, { message: 'Максимальное число знаков не может быть больше $constraint1' })
	@MinLength(2, { message: 'Минимальное число знаков не может быть меньше $constraint1' })
	@IsString({ message: 'Неверный тип данных, требуется string' })
	city: string;

	@ValidateIf((e) => e !== '')
	@IsArray({ message: 'Неверный тип данных, требуется массив' })
	@ValidateNested({ each: true, message: 'Неверный тип DTO' })
	@Type(() => ArtistDto)
	artists?: ArtistDto[];

	@MaxLength(5024, { message: 'Максимальное число знаков не может быть больше $constraint1' })
	@MinLength(30, { message: 'Минимальное число знаков не может быть меньше $constraint1' })
	@IsString({ message: 'Неверный тип данных, требуется string' })
	description: string;

	@ArrayMaxSize(30, {
		message: 'Максимальное число элементов массива не может быть больше $constraint1',
	})
	@ArrayMinSize(1, {
		message: 'Минимальное число элементов массива не может быть меньше $constraint1',
	})
	@MaxLength(30, {
		each: true,
		message: 'Максимальное число знаков не может быть больше $constraint1',
	})
	@MinLength(1, {
		each: true,
		message: 'Минимальное число знаков не может быть меньше $constraint1',
	})
	@IsArray({ message: 'Требуется массив' })
	@IsString({ each: true, message: 'Неверный тип данных, требуется string' })
	tags: string[];

	@MaxLength(30, { message: 'Максимальное число знаков не может быть больше $constraint1' })
	@MinLength(2, { message: 'Минимальное число знаков не может быть меньше $constraint1' })
	@IsString({ message: 'Неверный тип данных, требуется string' })
	alias: string;

	@MaxLength(30, { message: 'Максимальное число знаков не может быть больше $constraint1' })
	@MinLength(2, { message: 'Минимальное число знаков не может быть меньше $constraint1' })
	@IsString({ message: 'Неверный тип данных, требуется string' })
	category: string;
}
