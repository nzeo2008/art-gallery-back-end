import { injectable } from 'inversify';
import { ExhibitionDto } from './exhibition.dto';
import { exhibitionModel } from './exhibition.model';
import { IExhibitionsRepository } from './exhibitions.repository.interface';

@injectable()
export class ExhibitionsRepository implements IExhibitionsRepository {
	async createExhibitionPost(body: ExhibitionDto) {
		return exhibitionModel.create(body);
	}

	async findExhibitionPostById(id: string) {
		return exhibitionModel.findById(id).exec();
	}

	async findExhibitionPostByAlias(alias: string) {
		return exhibitionModel.findOne({ alias }).exec();
	}

	async findExhibitionPostByTitle(title: string) {
		return exhibitionModel
			.find({ title: { $regex: `${title}` } }, [], { sort: { startDate: -1 } })
			.exec();
	}

	async findExhibitionPostsByCategory(category: string) {
		return exhibitionModel.find({ category }, [], { sort: { startDate: -1 } }).exec();
	}

	async findExhibitionPostsByTags(tags: string) {
		return exhibitionModel.find({ tags }, [], { sort: { startDate: -1 } }).exec();
	}

	async updateExhibitionPostById(id: string, dto: ExhibitionDto) {
		return exhibitionModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async deleteExhibitionPostById(id: string) {
		return exhibitionModel.findByIdAndDelete(id).exec();
	}
}
