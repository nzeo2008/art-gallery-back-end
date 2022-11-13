import { validate } from 'class-validator';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { IValidator } from './validator.interface';
import { NextFunction, Response, Request } from 'express';
import { ERROR_CONSTANTS } from '../errors/errors.constant';

export class Validator implements IValidator {
	constructor(private validateInstance: ClassConstructor<object>) {}

	check({ body }: Request, res: Response, next: NextFunction): void {
		const classInstance = plainToInstance(this.validateInstance, body);

		validate(classInstance).then((errors) => {
			if (errors.length > 0) {
				res.status(ERROR_CONSTANTS.COMMON_ERROR_422_STATUS_CODE).send(errors);
			} else next();
		});
	}
}
