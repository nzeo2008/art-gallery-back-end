import { Response, NextFunction, Request, Router } from 'express';
import { EventDto } from './event.dto';

export interface IEventsController {
	router: Router;
	create: (req: Request, res: Response, next: NextFunction) => void;
	search: (req: Request<{}, {}, EventDto>, res: Response, next: NextFunction) => void;
	searchByCategory: (req: Request<{}, {}, EventDto>, res: Response, next: NextFunction) => void;
	update: (req: Request, res: Response, next: NextFunction) => void;
	delete: (req: Request, res: Response, next: NextFunction) => void;
}
