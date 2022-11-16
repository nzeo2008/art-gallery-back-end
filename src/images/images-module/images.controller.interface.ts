import { ArtistDto } from '../../artists/artist.dto';
import { ExhibitionDto } from '../../exhibitions/exhibition.dto';
import { EventDto } from './../../events/event.dto';
import { EventModel } from './../../events/event.model';
import { ExhibitionModel } from './../../exhibitions/exhibition.model';
import { ArtistModel } from './../../artists/artist.model';

export interface IImagesController {
	uploadEventImagesToCloud: (
		body: EventDto,
		files: Express.Multer.File[],
	) => Promise<String[] | null>;

	uploadArtistImagesToCloud: (body: ArtistDto, files: Express.Multer.File[]) => Promise<{} | null>;

	uploadExhibitionImagesToCloud: (
		body: ExhibitionDto,
		files: Express.Multer.File[],
	) => Promise<String[] | null>;

	deleteEventImagesFromCloud: (body: EventModel) => Promise<boolean>;

	deleteExhibitionImagesFromCloud: (body: ExhibitionModel) => Promise<boolean>;

	deleteArtistImagesFromCloud: (body: ArtistModel) => Promise<boolean>;
}
