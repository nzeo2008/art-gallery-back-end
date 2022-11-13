import { getModelForClass, prop } from '@typegoose/typegoose';
import { ArtistModel } from './../artists/artist.model';

export class ExhibitionModel {
	@prop()
	title: string;

	@prop()
	startDate: Date;

	@prop()
	endDate: Date;

	@prop()
	city: string;

	@prop({ type: () => [ArtistModel] })
	artists: ArtistModel[];

	@prop()
	description: string;

	@prop({ type: () => [String] })
	tags: string[];

	@prop({ unique: true })
	alias: string;

	@prop()
	category: string;

	@prop({ type: () => [String] })
	images: string[];
}

export const exhibitionModel = getModelForClass(ExhibitionModel);
