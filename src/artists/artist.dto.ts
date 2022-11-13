import {
	IsArray,
	IsString,
	MaxLength,
	MinLength,
	ArrayMaxSize,
	ArrayMinSize,
	ValidateIf,
} from 'class-validator';

export class ArtistDto {
	@MaxLength(30, { message: 'Максимальное число знаков не может быть больше $constraint1' })
	@MinLength(2, { message: 'Минимальное число знаков не может быть меньше $constraint1' })
	@IsString({ message: 'Неверный тип данных, требуется string' })
	name: string;

	@ValidateIf((e) => e.surname !== '')
	@MaxLength(30, { message: 'Максимальное число знаков не может быть больше $constraint1' })
	@MinLength(2, { message: 'Минимальное число знаков не может быть меньше $constraint1' })
	@IsString({ message: 'Неверный тип данных, требуется string' })
	surname?: string;

	@ValidateIf((e) => e.nickname !== '')
	@MaxLength(30, { message: 'Максимальное число знаков не может быть больше $constraint1' })
	@MinLength(2, { message: 'Минимальное число знаков не может быть меньше $constraint1' })
	@IsString({ message: 'Неверный тип данных, требуется string' })
	nickname?: string;

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

	@MaxLength(5024, { message: 'Максимальное число знаков не может быть больше $constraint1' })
	@MinLength(30, { message: 'Минимальное число знаков не может быть меньше $constraint1' })
	@IsString()
	bio: string;

	@MaxLength(30, { message: 'Максимальное число знаков не может быть больше $constraint1' })
	@MinLength(2, { message: 'Минимальное число знаков не может быть меньше $constraint1' })
	@IsString({ message: 'Неверный тип данных, требуется string' })
	category: string;
}
