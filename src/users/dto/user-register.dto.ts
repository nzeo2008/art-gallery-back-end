import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsString({ message: 'Неверно введёно имя' })
	name: string;

	@IsEmail({}, { message: 'Неверно введён email' })
	email: string;

	@IsString({ message: 'Неверно введён пароль' })
	password: string;
}
