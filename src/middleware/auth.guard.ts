import { NextFunction, Request, Response } from 'express';
import { IValidator } from './validator.interface';
import { ERROR_CONSTANTS } from './../errors/errors.constant';

export class AuthGuard implements IValidator {
	check(req: Request, res: Response, next: NextFunction): void {
		if (req.user) {
			return next();
		}
		res.status(ERROR_CONSTANTS.FORBIDDEN_STATUS_CODE).send(ERROR_CONSTANTS.FORBIDDEN_MESSAGE);
	}
}
