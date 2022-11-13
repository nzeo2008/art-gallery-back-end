import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { IValidator } from './validator.interface';

export class AuthMiddleware implements IValidator {
	constructor(private secret: string) {}

	check(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload) {
					const myPayload = payload as JwtPayload;
					req.user = myPayload.isAdmin;

					next();
				}
			});
		} else {
			next();
		}
	}
}
