import { IsDateString, IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class EventDto {
	@MaxLength(50, { message: 'Максимальное число знаков не может быть больше $constraint1' })
	@MinLength(2, { message: 'Минимальное число знаков не может быть меньше $constraint1' })
	@IsString({ message: 'Неверный тип данных, требуется string' })
	title: string;

	@MaxLength(5024, { message: 'Максимальное число знаков не может быть больше $constraint1' })
	@MinLength(30, { message: 'Минимальное число знаков не может быть меньше $constraint1' })
	@IsString({ message: 'Неверный тип данных, требуется string' })
	article: string;

	@IsOptional()
	@IsDateString({ message: 'Некорректный тип даты и времени' })
	createdAt?: Date;

	@MaxLength(30, { message: 'Максимальное число знаков не может быть больше $constraint1' })
	@MinLength(2, { message: 'Минимальное число знаков не может быть меньше $constraint1' })
	@IsString({ message: 'Неверный тип данных, требуется string' })
	alias: string;

	@MaxLength(30, { message: 'Максимальное число знаков не может быть больше $constraint1' })
	@MinLength(2, { message: 'Минимальное число знаков не может быть меньше $constraint1' })
	@IsString({ message: 'Неверный тип данных, требуется string' })
	category: string;
}
