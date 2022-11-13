import { getModelForClass, prop } from '@typegoose/typegoose';

export class EventModel {
	@prop()
	title: string;

	@prop()
	article: string;

	@prop({ default: new Date().toISOString() })
	createdAt?: Date;

	@prop({ unique: true })
	alias: string;

	@prop()
	category: string;

	@prop({ type: () => [String] })
	images: string[];
}

export const eventModel = getModelForClass(EventModel);
