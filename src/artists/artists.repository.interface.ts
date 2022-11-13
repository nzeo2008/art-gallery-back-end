import { ArtistDto } from './artist.dto';
import { ArtistModel } from './artist.model';

export interface IArtistsRepository {
	createArtistBody: (body: ArtistDto) => Promise<ArtistModel | null>;

	findArtistBodyById: (id: string) => Promise<ArtistModel | null>;

	findArtistsBodyByCategory: (category: string) => Promise<ArtistModel[] | null>;

	findArtistsBodyByTags: (tags: string) => Promise<ArtistModel[] | null>;

	updateArtistBodyById: (id: string, dto: ArtistDto) => Promise<ArtistModel | null>;

	deleteArtistBodyById: (id: string) => Promise<ArtistModel | null>;

	findArtistBodyByName: (name: string) => Promise<ArtistModel[] | null>;
}
