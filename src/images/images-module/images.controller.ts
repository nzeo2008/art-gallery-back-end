import { inject, injectable } from 'inversify';
import { TYPES } from './../../types';
import { IImagesService } from './images.service.interface';
import { EventDto } from './../../events/event.dto';
import { ExhibitionDto } from '../../exhibitions/exhibition.dto';
import { ArtistDto } from './../../artists/artist.dto';
import { EventModel } from './../../events/event.model';
import 'reflect-metadata';
import { ExhibitionModel } from './../../exhibitions/exhibition.model';
import { ArtistModel } from './../../artists/artist.model';

@injectable()
export class ImagesController implements ImagesController {
	constructor(@inject(TYPES.ImagesService) private readonly imagesService: IImagesService) {}

	async uploadEventImagesToCloud(body: EventDto, files: Express.Multer.File[]) {
		if (!files || files.length === 0) {
			return null;
		}

		const result = await this.imagesService.saveEventImagesToCloud(body, files);

		return result;
	}

	async uploadExhibitionImagesToCloud(body: ExhibitionDto, files: Express.Multer.File[]) {
		if (!files || files.length === 0) {
			return null;
		}

		const result = await this.imagesService.saveExhibitionImagesToCloud(body, files);

		return result;
	}

	async uploadArtistImagesToCloud(body: ArtistDto, files: Express.Multer.File[]) {
		if (!files || files.length === 0) {
			return null;
		}

		const result = await this.imagesService.saveArtistImagesToCloud(body, files);

		return result;
	}

	async deleteEventImagesFromCloud(body: EventModel) {
		return this.imagesService.deleteEventImagesFolderFromCloud(body);
	}

	async deleteExhibitionImagesFromCloud(body: ExhibitionModel) {
		return this.imagesService.deleteExhibitionImagesFolderFromCloud(body);
	}

	async deleteArtistImagesFromCloud(body: ArtistModel) {
		return this.imagesService.deleteArtistImagesFolderFromCloud(body);
	}
}
