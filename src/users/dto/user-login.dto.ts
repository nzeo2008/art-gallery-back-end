import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Неверно введён email' })
	email: string;

	@IsString({ message: 'Неверно введён пароль' })
	password: string;

	isAdmin?: boolean;
}
