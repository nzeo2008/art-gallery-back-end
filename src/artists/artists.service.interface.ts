import { ArtistDto } from './artist.dto';
import { ArtistModel } from './artist.model';

export interface IArtistsService {
	createArtist: (body: ArtistDto) => Promise<ArtistModel | null>;

	findArtistById: (id: string) => Promise<ArtistModel | null>;

	findArtistByName: (name: string) => Promise<ArtistModel[] | null>;

	findArtistsByCategory: (category: string) => Promise<ArtistModel[] | null>;

	findArtistsByTags: (tags: string) => Promise<ArtistModel[] | null>;

	updateArtistById: (id: string, dto: ArtistDto) => Promise<ArtistModel | null>;

	deleteArtistById: (id: string) => Promise<ArtistModel | null>;
}
