import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ExhibitionDto } from './exhibition.dto';
import { IExhibitionsRepository } from './exhibitions.repository.interface';
import { IExhibitionsService } from './exhibitions.service.interface';
import { IImagesController } from './../images/images-module/images.controller.interface';

@injectable()
export class ExhibitionsService implements IExhibitionsService {
	constructor(
		@inject(TYPES.ExhibitionsRepository)
		private readonly exhibitionsRepository: IExhibitionsRepository,
	) {}

	async createExhibition(body: ExhibitionDto) {
		return this.exhibitionsRepository.createExhibitionPost(body);
	}

	async findExhibitionById(id: string) {
		return this.exhibitionsRepository.findExhibitionPostById(id);
	}

	async findExhibitionByAlias(alias: string) {
		return this.exhibitionsRepository.findExhibitionPostByAlias(alias);
	}

	async findExhibitionByTitle(title: string) {
		return this.exhibitionsRepository.findExhibitionPostByTitle(title);
	}

	async findExhibitionsByCategory(category: string) {
		return this.exhibitionsRepository.findExhibitionPostsByCategory(category);
	}

	async findExhibitionsByTags(tags: string) {
		return this.exhibitionsRepository.findExhibitionPostsByTags(tags);
	}

	async updateExhibitionById(id: string, dto: ExhibitionDto) {
		return this.exhibitionsRepository.updateExhibitionPostById(id, dto);
	}

	async deleteExhibitionById(id: string) {
		return this.exhibitionsRepository.deleteExhibitionPostById(id);
	}
}
