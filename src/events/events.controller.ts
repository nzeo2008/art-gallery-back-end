import { inject, injectable } from 'inversify';
import { Controller } from '../common/controller';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { EventDto } from './event.dto';
import { IEventsService } from './events.service.interface';
import { Request, Response, NextFunction } from 'express';
import { createNewError } from '../errors/http.error';
import { ERROR_CONSTANTS } from './../errors/errors.constant';
import { Validator } from '../middleware/validator';
import { COMMON_STATUS_CODES } from './../common/statuscode.constants';
import { AuthGuard } from '../middleware/auth.guard';
import { IImagesController } from '../images/images-module/images.controller.interface';
import 'reflect-metadata';

@injectable()
export class EventsController extends Controller {
	constructor(
		@inject(TYPES.LoggerService) logger: ILogger,
		@inject(TYPES.EventsService) private readonly eventsService: IEventsService,
		@inject(TYPES.ImagesController) private readonly imagesController: IImagesController,
	) {
		super(logger);

		this.routes([
			{
				path: '/create-event',
				method: 'post',
				func: this.create,
				validators: [new Validator(EventDto), new AuthGuard()],
			},
			{
				path: '/search-event',
				method: 'get',
				func: this.search,
				validators: [],
			},
			{
				path: '/search-category',
				method: 'get',
				func: this.searchByCategory,
				validators: [],
			},
			{
				path: '/update-event',
				method: 'patch',
				func: this.update,
				validators: [new Validator(EventDto), new AuthGuard()],
			},
			{
				path: '/delete-event',
				method: 'delete',
				func: this.delete,
				validators: [new AuthGuard()],
			},
		]);
	}

	async create(req: Request, res: Response, next: NextFunction) {
		if (req.files === undefined || req.files.length === 0) {
			return this.send(
				res,
				ERROR_CONSTANTS.COMMON_ERROR_422_STATUS_CODE,
				ERROR_CONSTANTS.CREATE_EVENT_ERROR,
			);
		}

		const files = req.files as Express.Multer.File[];

		const findResult = await this.eventsService.findEventByAlias(req.body.alias);

		if (findResult) {
			return this.send(
				res,
				ERROR_CONSTANTS.COMMON_ERROR_422_STATUS_CODE,
				ERROR_CONSTANTS.EVENT_ALREADY_EXIST,
			);
		}

		const paths = await this.imagesController.uploadEventImagesToCloud(req.body, files);
		if (!paths || paths.length === 0) {
			return next(
				createNewError(
					'create-event',
					ERROR_CONSTANTS.COMMON_ERROR_422_STATUS_CODE,
					ERROR_CONSTANTS.CREATE_IMAGES_ERROR,
				),
			);
		}
		const body: EventDto = { ...req.body, images: paths };

		const result = await this.eventsService.createEvent(body);

		if (!result) {
			return next(
				createNewError(
					'create-event',
					ERROR_CONSTANTS.COMMON_ERROR_422_STATUS_CODE,
					ERROR_CONSTANTS.CREATE_EVENT_ERROR,
				),
			);
		}

		this.send(res, COMMON_STATUS_CODES.CREATED_STATUS_CODE, result);
	}

	async searchByCategory({ query }: Request<{}, {}, EventDto>, res: Response, next: NextFunction) {
		const result = await this.eventsService.findEventsByCategory(query.category as string);
		if (!result) {
			return this.send(res, ERROR_CONSTANTS.NOT_FOUND_STATUS_CODE, null);
		}
		this.send(res, COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, result);
	}

	async search({ query }: Request<{}, {}, EventDto>, res: Response, next: NextFunction) {
		const result = await this.eventsService.findEventByTitle(query.title as string);
		if (!result) {
			return this.send(res, ERROR_CONSTANTS.NOT_FOUND_STATUS_CODE, null);
		}
		this.send(res, COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, result);
	}

	async update(req: Request, res: Response, next: NextFunction) {
		if (req.files === undefined || req.files.length === 0) {
			return this.send(
				res,
				ERROR_CONSTANTS.COMMON_ERROR_422_STATUS_CODE,
				ERROR_CONSTANTS.CREATE_IMAGES_ERROR,
			);
		}

		const files = req.files as Express.Multer.File[];

		const { _id, ...dto } = req.body;

		const findEventResult = await this.eventsService.findEventById(_id);

		if (!findEventResult) {
			return next(
				createNewError(
					'update-event',
					ERROR_CONSTANTS.NOT_FOUND_STATUS_CODE,
					ERROR_CONSTANTS.EVENT_NOT_FOUND_MESSAGE,
				),
			);
		}

		const result = await this.imagesController.deleteEventImagesFromCloud(findEventResult);

		if (!result) {
			return next(
				createNewError(
					'update-event',
					ERROR_CONSTANTS.CONFLICT_STATUS_CODE,
					ERROR_CONSTANTS.DELETE_CONFLICT_MESSAGE,
				),
			);
		}

		const paths = await this.imagesController.uploadEventImagesToCloud(req.body, files);
		const event = { ...dto, images: paths };
		const updatedEvent = await this.eventsService.updateEventById(_id, event);
		this.send(res, COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, updatedEvent);
	}

	async delete({ query }: Request, res: Response, next: NextFunction) {
		const id = query._id as string;
		const findEventResult = await this.eventsService.findEventById(id);

		if (!findEventResult) {
			return next(
				createNewError(
					'delete-event',
					ERROR_CONSTANTS.NOT_FOUND_STATUS_CODE,
					ERROR_CONSTANTS.EVENT_NOT_FOUND_MESSAGE,
				),
			);
		}

		const result = await this.imagesController.deleteEventImagesFromCloud(findEventResult);

		if (!result) {
			return next(
				createNewError(
					'delete-event',
					ERROR_CONSTANTS.CONFLICT_STATUS_CODE,
					ERROR_CONSTANTS.DELETE_CONFLICT_MESSAGE,
				),
			);
		}

		const deletedEvent = await this.eventsService.deleteEventById(id);

		if (!deletedEvent) {
			return next(
				createNewError(
					'delete-event',
					ERROR_CONSTANTS.CONFLICT_STATUS_CODE,
					ERROR_CONSTANTS.DELETE_CONFLICT_MESSAGE,
				),
			);
		}

		this.send(res, COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, {});
	}
}
