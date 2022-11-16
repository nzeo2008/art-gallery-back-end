import { injectable, inject } from 'inversify';
import { Controller } from '../common/controller';
import { IExhibitionsController } from './exhibitions.controller.interface';
import { IExhibitionsService } from './exhibitions.service.interface';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { ExhibitionDto } from './exhibition.dto';
import { Validator } from '../middleware/validator';
import { NextFunction, Response, Request } from 'express';
import { ERROR_CONSTANTS } from '../errors/errors.constant';
import { COMMON_STATUS_CODES } from '../common/statuscode.constants';
import { createNewError } from '../errors/http.error';
import { AuthGuard } from '../middleware/auth.guard';
import { IImagesController } from '../images/images-module/images.controller.interface';
import 'reflect-metadata';

@injectable()
export class ExhibitionsController extends Controller implements IExhibitionsController {
	constructor(
		@inject(TYPES.LoggerService) logger: ILogger,
		@inject(TYPES.ExhibitionsService) private readonly exhibitionsService: IExhibitionsService,
		@inject(TYPES.ImagesController) private readonly imagesController: IImagesController,
	) {
		super(logger);

		this.routes([
			{
				path: '/create-exhibition',
				method: 'post',
				func: this.create,
				validators: [new Validator(ExhibitionDto), new AuthGuard()],
			},
			{
				path: '/search-exhibition',
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
				path: '/search-tags',
				method: 'get',
				func: this.searchByTags,
				validators: [],
			},
			{
				path: '/update-exhibition',
				method: 'patch',
				func: this.update,
				validators: [new Validator(ExhibitionDto), new AuthGuard()],
			},
			{
				path: '/delete-exhibition',
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
				ERROR_CONSTANTS.CREATE_IMAGES_ERROR,
			);
		}

		const files = req.files as Express.Multer.File[];

		const findResult = await this.exhibitionsService.findExhibitionByAlias(req.body.alias);

		if (findResult) {
			return this.send(
				res,
				ERROR_CONSTANTS.COMMON_ERROR_422_STATUS_CODE,
				ERROR_CONSTANTS.EXHIBITION_ALREADY_EXIST,
			);
		}

		const paths = await this.imagesController.uploadExhibitionImagesToCloud(req.body, files);
		if (!paths || paths.length === 0) {
			return next(
				createNewError(
					'create-exhibition',
					ERROR_CONSTANTS.COMMON_ERROR_422_STATUS_CODE,
					ERROR_CONSTANTS.CREATE_IMAGES_ERROR,
				),
			);
		}
		const body = { ...req.body, images: paths };

		const result = await this.exhibitionsService.createExhibition(body);

		if (!result) {
			return next(
				createNewError(
					'create-exhibition',
					ERROR_CONSTANTS.COMMON_ERROR_422_STATUS_CODE,
					ERROR_CONSTANTS.CREATE_EXHIBITION_ERROR,
				),
			);
		}

		this.send(res, COMMON_STATUS_CODES.CREATED_STATUS_CODE, result);
	}

	async search({ query }: Request<{}, {}, ExhibitionDto>, res: Response, next: NextFunction) {
		const result = await this.exhibitionsService.findExhibitionByTitle(query.title as string);
		if (!result) {
			return this.send(res, ERROR_CONSTANTS.NOT_FOUND_STATUS_CODE, null);
		}
		this.send(res, COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, result);
	}

	async searchByCategory(
		{ query }: Request<{}, {}, ExhibitionDto>,
		res: Response,
		next: NextFunction,
	) {
		const result = await this.exhibitionsService.findExhibitionsByCategory(
			query.category as string,
		);
		if (!result) {
			return this.send(res, ERROR_CONSTANTS.NOT_FOUND_STATUS_CODE, null);
		}
		this.send(res, COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, result);
	}

	async searchByTags({ query }: Request<{}, {}, ExhibitionDto>, res: Response, next: NextFunction) {
		const result = await this.exhibitionsService.findExhibitionsByTags(query.tags as string);
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

		const findExhibitionResult = await this.exhibitionsService.findExhibitionById(_id);

		if (!findExhibitionResult) {
			return next(
				createNewError(
					'update-exhibition',
					ERROR_CONSTANTS.NOT_FOUND_STATUS_CODE,
					ERROR_CONSTANTS.EXHIBITION_NOT_FOUND_MESSAGE,
				),
			);
		}

		const result = await this.imagesController.deleteExhibitionImagesFromCloud(
			findExhibitionResult,
		);

		if (!result) {
			return next(
				createNewError(
					'update-exhibition',
					ERROR_CONSTANTS.CONFLICT_STATUS_CODE,
					ERROR_CONSTANTS.DELETE_CONFLICT_MESSAGE,
				),
			);
		}
		const paths = await this.imagesController.uploadExhibitionImagesToCloud(req.body, files);
		const exhibition = { ...dto, images: paths };
		const updatedExhibition = await this.exhibitionsService.updateExhibitionById(_id, exhibition);
		this.send(res, COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, updatedExhibition);
	}

	async delete({ query }: Request, res: Response, next: NextFunction) {
		const id = query._id as string;
		const findExhibitionResult = await this.exhibitionsService.findExhibitionById(id);

		if (!findExhibitionResult) {
			return next(
				createNewError(
					'delete-exhibition',
					ERROR_CONSTANTS.NOT_FOUND_STATUS_CODE,
					ERROR_CONSTANTS.EXHIBITION_NOT_FOUND_MESSAGE,
				),
			);
		}

		const result = await this.imagesController.deleteExhibitionImagesFromCloud(
			findExhibitionResult,
		);

		if (!result) {
			return next(
				createNewError(
					'delete-exhibition',
					ERROR_CONSTANTS.CONFLICT_STATUS_CODE,
					ERROR_CONSTANTS.DELETE_CONFLICT_MESSAGE,
				),
			);
		}

		const deletedExhibition = await this.exhibitionsService.deleteExhibitionById(id);

		if (!deletedExhibition) {
			return next(
				createNewError(
					'delete-exhibition',
					ERROR_CONSTANTS.CONFLICT_STATUS_CODE,
					ERROR_CONSTANTS.DELETE_CONFLICT_MESSAGE,
				),
			);
		}

		return this.send(res, COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, {});
	}
}
