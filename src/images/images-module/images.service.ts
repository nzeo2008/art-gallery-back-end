import { injectable } from 'inversify';
import { ensureDir, writeFile, rmSync } from 'fs-extra';
import { path } from 'app-root-path';
import { EventDto } from './../../events/event.dto';
import { ArtistDto } from './../../artists/artist.dto';
import { ExhibitionDto } from './../../exhibitions/exhibition.dto';
import 'reflect-metadata';

@injectable()
export class ImagesService implements ImagesService {
	basePath = `${path}/src/images/images-folder/`;

	async saveEventsImages(body: EventDto, files: Express.Multer.File[], from: string) {
		const uploadFolder = this.basePath + `${from}/${body.alias}`;
		await ensureDir(uploadFolder);
		const result = [];
		for (const file of files) {
			await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
			result.push(`${from}/${body.alias}/${file.originalname}`);
		}
		return result;
	}

	async saveExhibitionsImages(body: ExhibitionDto, files: Express.Multer.File[], from: string) {
		const uploadFolder = this.basePath + `${from}/${body.alias}`;
		await ensureDir(uploadFolder);
		const result = [];
		for (const file of files) {
			await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
			result.push(`${from}/${body.alias}/${file.originalname}`);
		}
		return result;
	}

	async saveArtistsImages(body: ArtistDto, files: Express.Multer.File[], from: string) {
		const fullname = body.name + body.surname + `(${body.nickname})`;
		const uploadFolder = this.basePath + `${from}/${fullname}`;
		await ensureDir(uploadFolder);
		const images = [];
		let avatar = '';
		for (const file of files) {
			if (file.originalname.replace(/\.[^/.]+$/, '').toLowerCase() === 'avatar') {
				await ensureDir(`${uploadFolder}/Avatar/`);
				await writeFile(`${uploadFolder}/Avatar/${file.originalname}`, file.buffer);
				avatar = `${from}/${fullname}/Avatar/${file.originalname}`;
			} else {
				await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
				images.push(`${from}/${fullname}/${file.originalname}`);
			}
		}
		return { avatar: avatar, images: images };
	}

	async deleteImagesFolder(images: string[]) {
		if (!images || images.length === 0) return false;
		const indexOfString = images[0].lastIndexOf('/');
		const imagesFolder = this.basePath + images[0].substring(0, indexOfString);
		try {
			rmSync(imagesFolder, { recursive: true, force: true });
			return true;
		} catch (error) {
			return false;
		}
	}
}
