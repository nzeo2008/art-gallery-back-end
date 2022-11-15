import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { IExceptionHandler } from './errors/exception.handler.interface';
import { IUsersController } from './users/users.controller.interface';
import { IDatabaseConnection } from './database/database.connection.interface';
import { ILogger } from './logger/logger.interface';
import { IEventsController } from './events/events.controller.interface';
import { IExhibitionsController } from './exhibitions/exhibitions.controller.interface';
import multer from 'multer';
import { IArtistsController } from './artists/artists.controller.interface';
import { AuthMiddleware } from './middleware/auth.middleware';
import { IConfigService } from './config/config.service.interface';
import cors from 'cors';
import 'reflect-metadata';
import { ExhibitionDto } from './exhibitions/exhibition.dto';

@injectable()
export class App {
	port: number;
	app: Express;
	server: Server;

	constructor(
		@inject(TYPES.LoggerService) private readonly logger: ILogger,
		@inject(TYPES.ExceptionHandler) private readonly exceptionHandler: IExceptionHandler,
		@inject(TYPES.UsersController) private readonly userController: IUsersController,
		@inject(TYPES.DatabaseConnection) private readonly database: IDatabaseConnection,
		@inject(TYPES.EventsController) private readonly eventsController: IEventsController,
		@inject(TYPES.ArtistsController) private readonly artistsController: IArtistsController,
		@inject(TYPES.ExhibitionsController)
		private readonly exhibitionsController: IExhibitionsController,
		@inject(TYPES.ConfigService) private readonly configService: IConfigService,
	) {
		this.port = Number(this.configService.get('CONNECTION_PORT')) || 3001;
		this.app = express();
		this.logger = logger;
	}

	connectToDatabase() {
		this.database.getConnection();
	}

	useValidator() {
		this.app.use(multer().array('images'));
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.check.bind(authMiddleware));
	}

	useRoutes() {
		this.app.use('/users', this.userController.router.bind(this.userController));
		this.app.use('/events', this.eventsController.router.bind(this.eventsController));
		this.app.use(
			'/exhibitions',
			this.exhibitionsController.router.bind(this.exhibitionsController),
		);
		this.app.use('/artists', this.artistsController.router.bind(this.artistsController));
		this.app.use('/static', express.static(__dirname + '/images/images-folder'));
	}

	useExceptionHandler() {
		this.app.use(this.exceptionHandler.catch.bind(this.exceptionHandler));
	}

	public async init() {
		this.app.use(cors());
		this.useValidator();
		this.useRoutes();
		this.useExceptionHandler();
		this.connectToDatabase();
		this.server = this.app.listen(this.port);
		this.logger.info(`Сервер запущен на http://localhost:${this.port}`);
	}
}
