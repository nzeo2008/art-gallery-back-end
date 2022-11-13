import { EventDto } from './event.dto';
import { EventModel } from './event.model';

export interface IEventsService {
	createEvent: (body: EventDto) => Promise<EventModel | null>;
	findEventById: (id: string) => Promise<EventModel | null>;
	findEventByAlias: (alias: string) => Promise<EventModel | null>;
	findEventByTitle: (title: string) => Promise<EventModel[] | null>;
	findEventsByCategory: (category: string) => Promise<EventModel[] | null>;
	updateEventById: (id: string, dto: EventDto) => Promise<EventModel | null>;
	deleteEventById: (id: string) => Promise<EventModel | null>;
}
