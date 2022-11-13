import { EventDto } from '../events/event.dto';
import { UserModel } from './user.model';

export interface IUsersRepository {
	create: (email: string, name: string, hashedPassword: string) => Promise<UserModel | null>;
	find: (email: string) => Promise<UserModel | null>;
	saveEventPostToUser: (email: string, savedEvents: EventDto[]) => Promise<UserModel | null>;
	deleteEventPostFromUser: (email: string, savedEvents: EventDto[]) => Promise<UserModel | null>;
	findEventPostByAliasFromUser: (alias: string) => Promise<UserModel | null>;
	getUserDataFromDatabase: (email: string) => Promise<UserModel | null>;
}
