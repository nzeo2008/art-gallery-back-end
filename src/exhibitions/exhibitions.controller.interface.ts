import { Router, Request, Response, NextFunction } from 'express';
import { ExhibitionDto } from './exhibition.dto';

export interface IExhibitionsController {
	router: Router;

	create: (req: Request, res: Response, next: NextFunction) => void;

	search: (req: Request<{}, {}, ExhibitionDto>, res: Response, next: NextFunction) => void;

	searchByCategory: (
		req: Request<{}, {}, ExhibitionDto>,
		res: Response,
		next: NextFunction,
	) => void;

	searchByTags: (req: Request<{}, {}, ExhibitionDto>, res: Response, next: NextFunction) => void;

	update: (req: Request, res: Response, next: NextFunction) => void;

	delete: (req: Request, res: Response, next: NextFunction) => void;
}
