import { Router, Response } from 'express';
import { injectable } from 'inversify';
import { IRouterController } from './controller.router.interface';
import { ILogger } from './../logger/logger.interface';
import 'reflect-metadata';

@injectable()
export abstract class Controller {
	private readonly _router: Router;
	protected readonly logger: ILogger;

	constructor(logger: ILogger) {
		this._router = Router();
		this.logger = logger;
	}

	get router() {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T) {
		return res.type('application/json').status(code).json(message);
	}

	protected routes(routes: IRouterController[]): void {
		for (const route of routes) {
			this.logger.info(`${route.method}: ${route.path}`);
			const handler = route.func.bind(this);
			const validators = route.validators?.map((validator) => {
				return validator.check.bind(validator);
			});
			const pipeline = validators ? [...validators, handler] : handler;
			this.router[route.method](route.path, pipeline);
		}
	}
}
