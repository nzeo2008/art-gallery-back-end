import { ExhibitionDto } from './exhibition.dto';
import { ExhibitionModel } from './exhibition.model';

export interface IExhibitionsRepository {
	createExhibitionPost: (body: ExhibitionDto) => Promise<ExhibitionModel | null>;

	findExhibitionPostById: (id: string) => Promise<ExhibitionModel | null>;

	findExhibitionPostByAlias: (alias: string) => Promise<ExhibitionModel | null>;

	findExhibitionPostByTitle: (title: string) => Promise<ExhibitionModel[] | null>;

	findExhibitionPostsByCategory: (category: string) => Promise<ExhibitionModel[] | null>;

	findExhibitionPostsByTags: (tags: string) => Promise<ExhibitionModel[] | null>;

	updateExhibitionPostById: (id: string, dto: ExhibitionDto) => Promise<ExhibitionModel | null>;

	deleteExhibitionPostById: (id: string) => Promise<ExhibitionModel | null>;
}
