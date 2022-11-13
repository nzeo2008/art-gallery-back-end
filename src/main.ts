import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IExceptionHandler } from './errors/exception.handler.interface';
import { ExceptionHandler } from './errors/exception.handler';
import { IUsersController } from './users/users.controller.interface';
import { UsersController } from './users/users.controller';
import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.service.interface';
import { IDatabaseConnection } from './database/database.connection.interface';
import { DatabaseConnection } from './database/database.connection';
import { IUsersService } from './users/users.service.interface';
import { UsersService } from './users/users.service';
import { IUsersRepository } from './users/users.repository.interface';
import { UsersRepository } from './users/users.repository';
import { EventsController } from './events/events.controller';
import { IEventsController } from './events/events.controller.interface';
import { EventsRepository } from './events/events.repository';
import { IEventsRepository } from './events/events.repository.interface';
import { EventsService } from './events/events.service';
import { IEventsService } from './events/events.service.interface';
import { IExhibitionsController } from './exhibitions/exhibitions.controller.interface';
import { IExhibitionsRepository } from './exhibitions/exhibitions.repository.interface';
import { IExhibitionsService } from './exhibitions/exhibitions.service.interface';
import { ExhibitionsController } from './exhibitions/exhibitions.controller';
import { ExhibitionsRepository } from './exhibitions/exhibitions.repository';
import { ExhibitionsService } from './exhibitions/exhibitions.service';
import { ImagesController } from './images/images-module/images.controller';
import { IImagesController } from './images/images-module/images.controller.interface';
import { ImagesService } from './images/images-module/images.service';
import { IImagesService } from './images/images-module/images.service.interface';
import { ArtistsController } from './artists/artists.controller';
import { IArtistsController } from './artists/artists.controller.interface';
import { IArtistsRepository } from './artists/artists.repository.interface';
import { ArtistsService } from './artists/artists.service';
import { IArtistsService } from './artists/artists.service.interface';
import { ArtistsRepository } from './artists/artists.repository';

export const containerModule = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
	bind<IExceptionHandler>(TYPES.ExceptionHandler).to(ExceptionHandler).inSingletonScope();
	bind<App>(TYPES.Application).to(App).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<IDatabaseConnection>(TYPES.DatabaseConnection).to(DatabaseConnection).inSingletonScope();

	bind<IUsersController>(TYPES.UsersController).to(UsersController).inSingletonScope();
	bind<IUsersService>(TYPES.UsersService).to(UsersService).inSingletonScope();
	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();

	bind<IEventsController>(TYPES.EventsController).to(EventsController).inSingletonScope();
	bind<IEventsService>(TYPES.EventsService).to(EventsService).inSingletonScope();
	bind<IEventsRepository>(TYPES.EventsRepository).to(EventsRepository).inSingletonScope();

	bind<IExhibitionsController>(TYPES.ExhibitionsController)
		.to(ExhibitionsController)
		.inSingletonScope();
	bind<IExhibitionsService>(TYPES.ExhibitionsService).to(ExhibitionsService).inSingletonScope();
	bind<IExhibitionsRepository>(TYPES.ExhibitionsRepository)
		.to(ExhibitionsRepository)
		.inSingletonScope();

	bind<IImagesController>(TYPES.ImagesController).to(ImagesController).inSingletonScope();
	bind<IImagesService>(TYPES.ImagesService).to(ImagesService).inSingletonScope();

	bind<IArtistsController>(TYPES.ArtistsController).to(ArtistsController).inSingletonScope();
	bind<IArtistsService>(TYPES.ArtistsService).to(ArtistsService).inSingletonScope();
	bind<IArtistsRepository>(TYPES.ArtistsRepository).to(ArtistsRepository).inSingletonScope();
});

function bootstrap() {
	const container = new Container();

	container.load(containerModule);

	const app = container.get<App>(TYPES.Application);

	app.init();

	return { app, container };
}

export const { app, container } = bootstrap();
