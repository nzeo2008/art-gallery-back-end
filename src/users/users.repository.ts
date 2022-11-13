import { IUsersRepository } from './users.repository.interface';
import { userModel, UserModel } from './user.model';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { EventDto } from './../events/event.dto';

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor() {}

	async create(email: string, name: string, hashedPassword: string): Promise<UserModel | null> {
		return await userModel.create({ email, name, password: hashedPassword });
	}

	async find(email: string): Promise<UserModel | null> {
		return await userModel.findOne({ email });
	}

	async saveEventPostToUser(email: string, savedEvents: EventDto[]) {
		return userModel.findOneAndUpdate({ email }, { $set: { savedEvents } }, { new: true }).exec();
	}

	async deleteEventPostFromUser(email: string, savedEvents: EventDto[]) {
		return userModel.findOneAndUpdate({ email }, { $set: { savedEvents } }, { new: true }).exec();
	}

	async getUserDataFromDatabase(email: string): Promise<UserModel | null> {
		return userModel.findOne({ email }, { savedEvents: 1, email: 1, name: 1, registerDate: 1 });
	}

	async findEventPostByAliasFromUser(alias: string) {
		return userModel.findOne({ 'savedEvents.alias': alias }, { savedEvents: 1 }).exec();
	}
}
