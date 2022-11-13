import { prop, getModelForClass } from '@typegoose/typegoose';
import { EventModel } from '../events/event.model';

export class UserModel {
	@prop()
	name: string;

	@prop({ unique: true })
	email: string;

	@prop()
	password: string;

	@prop()
	isAdmin: boolean;

	@prop({ type: () => [EventModel], default: [] })
	savedEvents: EventModel[];

	@prop({ default: new Date().toISOString() })
	registerDate: Date;
}

export const userModel = getModelForClass(UserModel);
