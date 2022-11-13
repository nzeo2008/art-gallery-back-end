import { artistModel } from './artist.model';
import { ArtistDto } from './artist.dto';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class ArtistsRepository {
	createArtistBody(body: ArtistDto) {
		return artistModel.create(body);
	}

	findArtistBodyById(id: string) {
		return artistModel.findById(id).exec();
	}

	updateArtistBodyById(id: string, dto: ArtistDto) {
		return artistModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	deleteArtistBodyById(id: string) {
		return artistModel.findByIdAndDelete(id).exec();
	}

	async findArtistBodyByName(name: string) {
		return artistModel
			.find({
				name: { $regex: `${name}` },
			})
			.exec();
	}

	async findArtistsBodyByCategory(category: string) {
		return artistModel
			.find({
				category,
			})
			.exec();
	}

	async findArtistsBodyByTags(tags: string) {
		return artistModel
			.find({
				tags,
			})
			.exec();
	}
}
