import { IUsersController } from './users.controller.interface';
import { Request, Response, NextFunction } from 'express';
import { Controller } from '../common/controller';
import { inject, injectable } from 'inversify';
import { TYPES } from './../types';
import { ILogger } from './../logger/logger.interface';
import { IUsersService } from './users.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { ERROR_CONSTANTS } from './../errors/errors.constant';
import * as jwt from 'jsonwebtoken';
import { IConfigService } from './../config/config.service.interface';
import { Validator } from '../middleware/validator';
import { UserLoginDto } from './dto/user-login.dto';
import { COMMON_STATUS_CODES } from '../common/statuscode.constants';
import 'reflect-metadata';
import { createNewError } from '../errors/http.error';

@injectable()
export class UsersController extends Controller implements IUsersController {
	constructor(
		@inject(TYPES.LoggerService) logger: ILogger,
		@inject(TYPES.UsersService) private readonly userService: IUsersService,
		@inject(TYPES.ConfigService) private readonly configService: IConfigService,
	) {
		super(logger);

		this.routes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
				validators: [new Validator(UserLoginDto)],
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				validators: [new Validator(UserRegisterDto)],
			},
			{
				path: '/save-event-to-user',
				method: 'patch',
				func: this.saveEvent,
				validators: [],
			},
			{
				path: '/delete-event-from-user',
				method: 'patch',
				func: this.deleteEvent,
				validators: [],
			},
			{
				path: '/search-event-from-user',
				method: 'get',
				func: this.searchEvent,
				validators: [],
			},
			{
				path: '/get-user-data',
				method: 'get',
				func: this.getUser,
				validators: [],
			},
		]);
	}

	async login({ body }: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
		const result = await this.userService.validateUser(body);
		if (!result) {
			return next(
				res
					.status(ERROR_CONSTANTS.USER_DOES_NOT_EXIST_STATUS_CODE)
					.send(ERROR_CONSTANTS.USER_DOES_NOT_EXIST_MESSAGE),
			);
		}

		const jwt = await this.getJWT(result.isAdmin, body.email, this.configService.get('SECRET'));
		return this.send(res, COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, { jwt });
	}

	async register({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(
				res
					.status(ERROR_CONSTANTS.CONFLICT_STATUS_CODE)
					.send(ERROR_CONSTANTS.ALREADY_EXIST_MESSAGE),
			);
		}
		return this.send(res, COMMON_STATUS_CODES.CREATED_STATUS_CODE, result);
	}

	async saveEvent({ body }: Request, res: Response, next: NextFunction) {
		const result = this.userService.saveEventPost(body.email, body.event);
		if (!result) {
			return next(
				createNewError(
					'search-event-from-user',
					ERROR_CONSTANTS.COMMON_ERROR_422_STATUS_CODE,
					ERROR_CONSTANTS.NOT_FOUND_MESSAGE,
				),
			);
		}
		this.send(res, COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, result);
	}

	async deleteEvent({ body }: Request, res: Response, next: NextFunction) {
		const result = this.userService.deleteEventPost(body.email, body.alias);
		if (!result) {
			return next(
				createNewError(
					'delete-event-from-user',
					ERROR_CONSTANTS.COMMON_ERROR_422_STATUS_CODE,
					ERROR_CONSTANTS.NOT_FOUND_MESSAGE,
				),
			);
		}
		this.send(res, COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, result);
	}

	async searchEvent({ query }: Request, res: Response, next: NextFunction) {
		const result = await this.userService.findEventPostByAlias(query.alias as string);
		if (!result) {
			return this.send(res, COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, null);
		}
		this.send(res, COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, result);
	}

	async getUser({ query }: Request, res: Response, next: NextFunction) {
		const result = await this.userService.getUserData(query.email as string);
		if (!result) {
			return this.send(res, ERROR_CONSTANTS.NOT_FOUND_STATUS_CODE, null);
		}
		this.send(res, COMMON_STATUS_CODES.SUCCESS_STATUS_CODE, result);
	}

	getJWT = async (isAdmin: boolean, email: string, secret: string) =>
		new Promise((resolve, reject) =>
			jwt.sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
					isAdmin,
				},
				secret,
				{ algorithm: 'HS256', expiresIn: '7d' },
				(error, token) => {
					if (error) {
						this.logger.error(`Ошибка при подписи JWT: ${error.name}`);
						reject(error);
					}
					resolve(token as string);
				},
			),
		);
}
