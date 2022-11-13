import { Request, NextFunction, Response, Router } from 'express';

export interface IUsersController {
	router: Router;
	login: (req: Request, res: Response, next: NextFunction) => void;
	register: (req: Request, res: Response, next: NextFunction) => void;
	saveEvent: (req: Request, res: Response, next: NextFunction) => void;
	deleteEvent: (req: Request, res: Response, next: NextFunction) => void;
	searchEvent: (req: Request, res: Response, next: NextFunction) => void;
	getUser: (req: Request, res: Response, next: NextFunction) => void;
}
