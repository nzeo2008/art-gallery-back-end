import { EventDto } from './../../events/event.dto';
import { ExhibitionDto } from './../../exhibitions/exhibition.dto';
import { ArtistDto } from './../../artists/artist.dto';

export interface IImagesService {
	saveArtistsImages: (body: ArtistDto, files: Express.Multer.File[], from: string) => Promise<{}>;

	saveExhibitionsImages: (
		body: ExhibitionDto,
		files: Express.Multer.File[],
		from: string,
	) => Promise<string[]>;

	saveEventsImages: (
		body: EventDto,
		files: Express.Multer.File[],
		from: string,
	) => Promise<string[]>;

	deleteImagesFolder: (images: string[]) => Promise<boolean>;
}
