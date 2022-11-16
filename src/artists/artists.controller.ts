import { inject, injectable } from 'inversify';
import { Controller } from '../common/controller';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { Request, Response, NextFunction } from 'express';
import { createNewError } from '../errors/http.error';
import { ERROR_CONSTANTS } from './../errors/errors.constant';
import { Validator } from '../middleware/validator';
import { COMMON_STATUS_CODES } from './../common/statuscode.constants';
import { IArtistsService } from './artists.service.interface';
import { ArtistDto } from './artist.dto';
import { AuthGuard } from '../middleware/auth.guard';
import { IImagesController } from '../images/images-module/images.controller.interface';
import 'reflect-metadata';

@injectable()
export class ArtistsController extends Controller {
	constructor(
		@inject(TYPES.LoggerService) logger: ILogger,
		@inject(TYPES.ArtistsService) private readonly artistsService: IArtistsService,
		@inject(TYPES.ImagesController) private readonly imagesController: IImagesController,
	) {
		super(logger);

		this.routes([
			{
				path: '/create-artist',
				method: 'post',
				func: this.create,
				validators: [new Validator(ArtistDto), new AuthGuard()],
			},
			{
				path: '/search-artist',
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
				path: '/update-artist',
				method: 'patch',
				func: this.update,
				validators: [new Validator(ArtistDto), new AuthGuard()],
			},
			{
				path: '/delete-artist',
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
				ERROR_CONSTANTS.CREATE_ARTIST_ERROR,
			);
		}

		const files = req.files as Express.Multer.File[];

		const paths = await this.imagesController.uploadArtistImagesToCloud(req.body, files);

		if (!paths) {
			return next(
				createNewError(
					'create-artist',
					ERROR_CONSTANTS.COMMON_ERROR_422_STATUS_CODE,
					ERROR_CONSTANTS.CREATE_IMAGES_ERROR,
				),
			);
		}

		const body: ArtistDto = { ...req.body, ...paths };

		const result = await this.artistsService.createArtist(body);

		if (!result) {
			return next(
				createNewError(
					'create-artist',
					ERROR_CONSTANTS.COMMON_ERROR_422_STATUS_CODE,
					ERROR_CONSTANTS.CREATE_ARTIST_ERROR,
				),
			);
		}

		this.send(res, COMMON_STATUS_CODES.CREATED_STATUS_CODE, result);
	}

	async search({ query }: Request<{}, {}, ArtistDto>, res: Response, next: NextFunction) {
		const artists = await this.artistsService.findArtistByName(query.name as string);

		if (!artists) {
			return this.send(res, ERROR_CONSTANTS.NOT_FOUND_STATUS_CODE, null);
		}

		this.send(res, COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, artists);
	}

	async searchByCategory({ query }: Request<{}, {}, ArtistDto>, res: Response, next: NextFunction) {
		const artists = await this.artistsService.findArtistsByCategory(query.category as string);

		if (!artists) {
			return this.send(res, ERROR_CONSTANTS.NOT_FOUND_STATUS_CODE, null);
		}

		this.send(res, COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, artists);
	}

	async searchByTags({ query }: Request<{}, {}, ArtistDto>, res: Response, next: NextFunction) {
		const artists = await this.artistsService.findArtistsByTags(query.tags as string);

		if (!artists) {
			return this.send(res, ERROR_CONSTANTS.NOT_FOUND_STATUS_CODE, null);
		}

		this.send(res, COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, artists);
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

		const findArtistResult = await this.artistsService.findArtistById(_id);

		if (!findArtistResult) {
			return next(
				createNewError(
					'update-artist',
					ERROR_CONSTANTS.NOT_FOUND_STATUS_CODE,
					ERROR_CONSTANTS.ARTIST_NOT_FOUND_MESSAGE,
				),
			);
		}

		const result = await this.imagesController.deleteArtistImagesFromCloud(findArtistResult);

		if (!result) {
			return next(
				createNewError(
					'update-artist',
					ERROR_CONSTANTS.CONFLICT_STATUS_CODE,
					ERROR_CONSTANTS.DELETE_CONFLICT_MESSAGE,
				),
			);
		}

		const paths = await this.imagesController.uploadArtistImagesToCloud(req.body, files);
		const artist = { ...dto, ...paths };
		const updatedArtist = await this.artistsService.updateArtistById(_id, artist);
		this.send(res, COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, updatedArtist);
	}

	async delete({ query }: Request, res: Response, next: NextFunction) {
		const id = query._id as string;
		const findArtistResult = await this.artistsService.findArtistById(id);

		if (!findArtistResult) {
			return next(
				createNewError(
					'delete-artist',
					ERROR_CONSTANTS.NOT_FOUND_STATUS_CODE,
					ERROR_CONSTANTS.ARTIST_NOT_FOUND_MESSAGE,
				),
			);
		}

		const result = await this.imagesController.deleteArtistImagesFromCloud(findArtistResult);

		if (!result) {
			return next(
				createNewError(
					'delete-artist',
					ERROR_CONSTANTS.CONFLICT_STATUS_CODE,
					ERROR_CONSTANTS.DELETE_CONFLICT_MESSAGE,
				),
			);
		}

		const deletedArtist = await this.artistsService.deleteArtistById(id);

		if (!deletedArtist) {
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
