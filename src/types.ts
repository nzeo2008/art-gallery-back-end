export const TYPES = {
	LoggerService: Symbol.for('LoggerService'),
	ExceptionHandler: Symbol.for('ExceptionHandler'),
	Application: Symbol.for('Application'),
	ConfigService: Symbol.for('ConfigService'),
	DatabaseConnection: Symbol.for('DatabaseConnection'),

	UsersController: Symbol.for('UsersController'),
	UsersService: Symbol.for('UsersService'),
	UsersRepository: Symbol.for('UsersRepository'),

	EventsController: Symbol.for('EventsController'),
	EventsService: Symbol.for('EventsService'),
	EventsRepository: Symbol.for('EventsRepository'),

	ExhibitionsController: Symbol.for('ExhibitionsController'),
	ExhibitionsService: Symbol.for('ExhibitionsService'),
	ExhibitionsRepository: Symbol.for('ExhibitionsRepository'),

	ImagesController: Symbol.for('ImagesController'),
	ImagesService: Symbol.for('ImagesService'),

	ArtistsController: Symbol.for('ArtistsController'),
	ArtistsService: Symbol.for('ArtistsService'),
	ArtistsRepository: Symbol.for('ArtistsRepository'),
};
