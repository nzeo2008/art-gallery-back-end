import { ExhibitionDto } from './exhibition.dto';
import { ExhibitionModel } from './exhibition.model';

export interface IExhibitionsService {
	createExhibition: (body: ExhibitionDto) => Promise<ExhibitionModel | null>;

	findExhibitionById: (id: string) => Promise<ExhibitionModel | null>;

	findExhibitionByAlias: (alias: string) => Promise<ExhibitionModel | null>;

	findExhibitionByTitle: (title: string) => Promise<ExhibitionModel[] | null>;

	findExhibitionsByCategory: (category: string) => Promise<ExhibitionModel[] | null>;

	findExhibitionsByTags: (tags: string) => Promise<ExhibitionModel[] | null>;

	updateExhibitionById: (id: string, dto: ExhibitionDto) => Promise<ExhibitionModel | null>;

	deleteExhibitionById: (id: string) => Promise<ExhibitionModel | null>;
}
