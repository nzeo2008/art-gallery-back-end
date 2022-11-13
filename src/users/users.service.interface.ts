import { UserRegisterDto } from './dto/user-register.dto';
import { UserModel } from './user.model';
import { UserLoginDto } from './dto/user-login.dto';
import { EventModel } from '../events/event.model';

export interface IUsersService {
	createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
	findUser: (email: string) => Promise<UserModel | null>;
	validateUser: (dto: UserLoginDto) => Promise<UserModel | null>;
	saveEventPost: (email: string, event: [EventModel]) => Promise<UserModel | null>;
	deleteEventPost: (email: string, alias: string) => Promise<UserModel | null>;
	findEventPostByAlias: (alias: string) => Promise<UserModel | null>;
	getUserData: (email: string) => Promise<UserModel | null>;
}
