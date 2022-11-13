import { NextFunction, Response, Request } from 'express';

export interface IValidator {
	check: (req: Request, res: Response, next: NextFunction) => void;
}
