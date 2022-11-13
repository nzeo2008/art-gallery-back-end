import { IExceptionHandler } from './exception.handler.interface';
import { Response, Request, NextFunction } from 'express';
import { HTTPError } from './http.error';
import { inject, injectable } from 'inversify';
import { ILogger } from './../logger/logger.interface';
import { TYPES } from './../types';
import 'reflect-metadata';

@injectable()
export class ExceptionHandler implements IExceptionHandler {
	constructor(@inject(TYPES.LoggerService) private readonly logger: ILogger) {}
	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
		if (err instanceof HTTPError) {
			this.logger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`);
			res.status(err.statusCode).send(err.message);
		} else if (err instanceof Error) {
			this.logger.error(`${err.message}`);
			res.status(500).send(err.message);
		}
	}
}
