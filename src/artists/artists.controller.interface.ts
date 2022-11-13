import { Response, NextFunction, Request, Router } from 'express';
import { ArtistDto } from './artist.dto';

export interface IArtistsController {
	router: Router;
	create: (req: Request, res: Response, next: NextFunction) => void;

	search: (req: Request<{}, {}, ArtistDto>, res: Response, next: NextFunction) => void;

	searchByCategory: (req: Request<{}, {}, ArtistDto>, res: Response, next: NextFunction) => void;

	searchByTags: (req: Request<{}, {}, ArtistDto>, res: Response, next: NextFunction) => void;

	update: (req: Request, res: Response, next: NextFunction) => void;

	delete: (req: Request, res: Response, next: NextFunction) => void;
}
