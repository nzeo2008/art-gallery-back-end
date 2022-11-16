import { EventDto } from './../../events/event.dto';
import { ExhibitionDto } from './../../exhibitions/exhibition.dto';
import { ArtistDto } from './../../artists/artist.dto';
import { EventModel } from './../../events/event.model';
import { ExhibitionModel } from './../../exhibitions/exhibition.model';
import { ArtistModel } from './../../artists/artist.model';

export interface IImagesService {
	saveEventImagesToCloud: (
		body: EventDto,
		files: Express.Multer.File[],
	) => Promise<String[] | null>;

	saveExhibitionImagesToCloud: (
		body: ExhibitionDto,
		files: Express.Multer.File[],
	) => Promise<String[] | null>;

	saveArtistImagesToCloud: (body: ArtistDto, files: Express.Multer.File[]) => Promise<{} | null>;

	deleteEventImagesFolderFromCloud: (body: EventModel) => Promise<boolean>;

	deleteExhibitionImagesFolderFromCloud: (body: ExhibitionModel) => Promise<boolean>;

	deleteArtistImagesFolderFromCloud: (body: ArtistModel) => Promise<boolean>;
}
