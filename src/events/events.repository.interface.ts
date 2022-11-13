import { EventDto } from './event.dto';
import { EventModel } from './event.model';

export interface IEventsRepository {
	createEventPost: (body: EventDto) => Promise<EventModel | null>;

	findEventPostById: (id: string) => Promise<EventModel | null>;

	findEventPostByAlias: (alias: string) => Promise<EventModel | null>;

	findEventPostByTitle: (title: string) => Promise<EventModel[] | null>;

	findEventPostsByCategory: (category: string) => Promise<EventModel[] | null>;

	updateEventPostById: (id: string, dto: EventDto) => Promise<EventModel | null>;

	deleteEventPostById: (id: string) => Promise<EventModel | null>;
}
