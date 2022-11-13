import { ArtistDto } from '../../artists/artist.dto';
import { ExhibitionDto } from '../../exhibitions/exhibition.dto';
import { EventDto } from './../../events/event.dto';

export interface IImagesController {
	uploadImagesToEvents: (body: EventDto, files: Express.Multer.File[]) => Promise<string[] | []>;
	uploadImagesToExhibitions: (
		body: ExhibitionDto,
		files: Express.Multer.File[],
	) => Promise<string[] | []>;
	uploadImagesToArtists: (body: ArtistDto, files: Express.Multer.File[]) => Promise<{} | []>;
	deleteImages: (images: string[]) => Promise<boolean>;
}
