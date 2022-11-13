import { Router, Request, Response, NextFunction } from 'express';
import { IValidator } from './../middleware/validator.interface';

export interface IRouterController {
	path: string;

	method: keyof Pick<Router, 'get' | 'post' | 'put' | 'patch' | 'delete'>;

	func: (req: Request, res: Response, next: NextFunction) => void;

	validators?: IValidator[];
}
