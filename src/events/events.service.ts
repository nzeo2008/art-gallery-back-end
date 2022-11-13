import { IEventsService } from './events.service.interface';
import { EventDto } from './event.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from './../types';
import { IEventsRepository } from './events.repository.interface';
import { IImagesController } from './../images/images-module/images.controller.interface';
import { rmdir } from 'fs-extra';

@injectable()
export class EventsService implements IEventsService {
	constructor(
		@inject(TYPES.EventsRepository) private readonly eventsRepository: IEventsRepository,
	) {}

	async createEvent(body: EventDto) {
		return this.eventsRepository.createEventPost(body);
	}

	async findEventById(id: string) {
		return this.eventsRepository.findEventPostById(id);
	}

	async findEventByAlias(alias: string) {
		return this.eventsRepository.findEventPostByAlias(alias);
	}

	async findEventByTitle(title: string) {
		return this.eventsRepository.findEventPostByTitle(title);
	}

	async findEventsByCategory(category: string) {
		return this.eventsRepository.findEventPostsByCategory(category);
	}

	async updateEventById(id: string, dto: EventDto) {
		return this.eventsRepository.updateEventPostById(id, dto);
	}

	async deleteEventById(id: string) {
		return this.eventsRepository.deleteEventPostById(id);
	}
}
