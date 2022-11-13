import { IUsersService } from './users.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { inject, injectable } from 'inversify';
import { TYPES } from './../types';
import { IConfigService } from './../config/config.service.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { IUsersRepository } from './users.repository.interface';
import { UserModel } from './user.model';
import { EventModel } from './../events/event.model';

@injectable()
export class UsersService implements IUsersService {
	constructor(
		@inject(TYPES.ConfigService) private readonly configService: IConfigService,
		@inject(TYPES.UsersRepository) private readonly userRepository: IUsersRepository,
	) {}

	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const user = new User(name, email);
		await user.setPassword(password, this.configService.get('SALT'));
		const result = await this.findUser(email);

		if (result) return null;
		return this.userRepository.create(email, name, user.password);
	}

	async findUser(email: string) {
		return await this.userRepository.find(email);
	}

	async saveEventPost(email: string, event: [EventModel]) {
		const result = await this.findUser(email);
		if (!result) {
			return null;
		}
		const { savedEvents } = result;
		savedEvents.push(...event);

		return this.userRepository.saveEventPostToUser(email, savedEvents);
	}

	async deleteEventPost(email: string, alias: string) {
		const result = await this.findUser(email);
		if (!result) {
			return null;
		}

		const updatedEvents = result.savedEvents.filter((event) => event.alias !== alias);

		return this.userRepository.saveEventPostToUser(email, updatedEvents);
	}

	async findEventPostByAlias(alias: string) {
		return this.userRepository.findEventPostByAliasFromUser(alias);
	}

	async getUserData(email: string) {
		return this.userRepository.getUserDataFromDatabase(email);
	}

	async validateUser({ email, password }: UserLoginDto): Promise<UserModel | null> {
		const userExist = await this.findUser(email);
		if (!userExist) {
			return null;
		}

		const user = new User(userExist.email, userExist.password);
		const compared = await user.comparePassword(password, userExist.password);
		if (!compared) {
			return null;
		}
		return userExist;
	}
}
