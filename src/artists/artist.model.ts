import { getModelForClass, prop } from '@typegoose/typegoose';

export class ArtistModel {
	@prop()
	name: string;

	@prop({ default: '' })
	surname?: string;

	@prop({ default: '' })
	nickname?: string;

	@prop({ type: () => [String] })
	tags: string[];

	@prop()
	bio: string;

	@prop()
	category: string;

	@prop()
	avatar: string;

	@prop({ type: () => [String] })
	images: string[];
}

export const artistModel = getModelForClass(ArtistModel);
