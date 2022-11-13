import { Request, Response, NextFunction } from 'express';

export interface IExceptionHandler {
	catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}
