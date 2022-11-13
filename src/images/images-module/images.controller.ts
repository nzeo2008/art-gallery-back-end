import { inject, injectable } from 'inversify';
import { TYPES } from './../../types';
import { IImagesService } from './images.service.interface';
import { EventDto } from './../../events/event.dto';
import { ExhibitionDto } from '../../exhibitions/exhibition.dto';
import { ArtistDto } from './../../artists/artist.dto';
import 'reflect-metadata';
import { ILogger } from './../../logger/logger.interface';

@injectable()
export class ImagesController implements ImagesController {
	constructor(
		@inject(TYPES.ImagesService) private readonly imagesService: IImagesService,
		@inject(TYPES.LoggerService) private readonly loggerService: ILogger,
	) {}

	async uploadImagesToEvents(body: EventDto, files: Express.Multer.File[]) {
		if (!files || files.length === 0) {
			return [];
		}
		return this.imagesService.saveEventsImages(body, files, 'events');
	}

	async uploadImagesToExhibitions(body: ExhibitionDto, files: Express.Multer.File[]) {
		if (!files || files.length === 0) {
			return [];
		}
		return this.imagesService.saveExhibitionsImages(body, files, 'exhibitions');
	}

	async uploadImagesToArtists(body: ArtistDto, files: Express.Multer.File[]) {
		if (!files || files.length === 0) {
			return [];
		}
		return this.imagesService.saveArtistsImages(body, files, 'artworks');
	}

	async deleteImages(images: string[]) {
		return this.imagesService.deleteImagesFolder(images);
	}
}
