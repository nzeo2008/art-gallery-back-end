import { inject, injectable } from 'inversify';
import { TYPES } from './../types';
import { IImagesController } from './../images/images-module/images.controller.interface';
import { IArtistsService } from './artists.service.interface';
import { IArtistsRepository } from './artists.repository.interface';
import { ArtistDto } from './artist.dto';
import 'reflect-metadata';

@injectable()
export class ArtistsService implements IArtistsService {
	constructor(
		@inject(TYPES.ArtistsRepository) private readonly artistsRepository: IArtistsRepository,
	) {}

	async createArtist(body: ArtistDto) {
		return this.artistsRepository.createArtistBody(body);
	}

	async findArtistById(id: string) {
		return this.artistsRepository.findArtistBodyById(id);
	}

	async findArtistByName(name: string) {
		return this.artistsRepository.findArtistBodyByName(name);
	}

	async findArtistsByCategory(category: string) {
		return this.artistsRepository.findArtistsBodyByCategory(category);
	}

	async findArtistsByTags(tags: string) {
		return this.artistsRepository.findArtistsBodyByTags(tags);
	}

	async updateArtistById(id: string, dto: ArtistDto) {
		return this.artistsRepository.updateArtistBodyById(id, dto);
	}

	async deleteArtistById(id: string) {
		return this.artistsRepository.deleteArtistBodyById(id);
	}
}
