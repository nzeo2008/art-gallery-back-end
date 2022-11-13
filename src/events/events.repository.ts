import { eventModel } from './event.model';
import { EventDto } from './event.dto';
import { IEventsRepository } from './events.repository.interface';
import { injectable } from 'inversify';

@injectable()
export class EventsRepository implements IEventsRepository {
	async createEventPost(body: EventDto) {
		return eventModel.create(body);
	}

	async findEventPostById(id: string) {
		return eventModel.findOne({ _id: id }).exec();
	}

	async findEventPostByAlias(alias: string) {
		return eventModel.findOne({ alias }).exec();
	}

	async findEventPostByTitle(title: string) {
		return eventModel
			.find({ title: { $regex: `${title}` } }, [], { sort: { createdAt: -1 } })
			.exec();
	}

	async findEventPostsByCategory(category: string) {
		return eventModel.find({ category }, [], { sort: { createdAt: -1 } }).exec();
	}

	async updateEventPostById(id: string, dto: EventDto) {
		return eventModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async deleteEventPostById(id: string) {
		return eventModel.findByIdAndDelete(id).exec();
	}
}
