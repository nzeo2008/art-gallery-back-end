import { injectable } from 'inversify';
import { EventDto } from './../../events/event.dto';
import { ArtistDto } from './../../artists/artist.dto';
import { ExhibitionDto } from './../../exhibitions/exhibition.dto';
import { storage } from './firebase';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import 'reflect-metadata';
import { ExhibitionModel } from './../../exhibitions/exhibition.model';
import { ArtistModel } from './../../artists/artist.model';
import { EventModel } from './../../events/event.model';

@injectable()
export class ImagesService implements ImagesService {
	async saveEventImagesToCloud(body: EventDto, files: Express.Multer.File[]) {
		const result: string[] = [];
		try {
			const imageListRef = ref(storage, `images/events/${body.alias}`);
			for (const file of files) {
				const imageRef = ref(storage, `images/events/${body.alias}/${file.originalname}`);
				await uploadBytes(imageRef, file.buffer);
			}

			const response = await listAll(imageListRef);

			for (const item of response.items) {
				const url = await getDownloadURL(item);
				result.push(url);
			}

			return result;
		} catch (ex) {
			return null;
		}
	}

	async saveExhibitionImagesToCloud(body: ExhibitionDto, files: Express.Multer.File[]) {
		const result: string[] = [];
		try {
			const imageListRef = ref(storage, `images/exhibitions/${body.alias}`);
			for (const file of files) {
				const imageRef = ref(storage, `images/exhibitions/${body.alias}/${file.originalname}`);
				await uploadBytes(imageRef, file.buffer);
			}

			const response = await listAll(imageListRef);

			for (const item of response.items) {
				const url = await getDownloadURL(item);
				result.push(url);
			}

			return result;
		} catch (ex) {
			return null;
		}
	}

	async saveArtistImagesToCloud(body: ArtistDto, files: Express.Multer.File[]) {
		const result: string[] = [];
		let avatar: string = '';
		const fullname = body.name + ' ' + body.surname + `(${body.nickname})`;
		try {
			const avatarImageListRef = ref(storage, `images/artists/${fullname}/Avatar`);
			const imagesListRef = ref(storage, `images/artists/${fullname}`);
			for (const file of files) {
				if (file.originalname.replace(/\.[^/.]+$/, '').toLowerCase() === 'avatar') {
					const imageRef = ref(storage, `images/artists/${fullname}/Avatar/${file.originalname}`);
					await uploadBytes(imageRef, file.buffer);
				} else {
					const imageRef = ref(storage, `images/artists/${fullname}/${file.originalname}`);
					await uploadBytes(imageRef, file.buffer);
				}
			}

			const imagesResponse = await listAll(imagesListRef);

			for (const item of imagesResponse.items) {
				const url = await getDownloadURL(item);
				result.push(url);
			}

			const avatarResponse = await listAll(avatarImageListRef);

			for (const item of avatarResponse.items) {
				const url = await getDownloadURL(item);
				avatar = url;
			}

			return { avatar: avatar, images: result };
		} catch (ex) {
			return null;
		}
	}

	async deleteEventImagesFolderFromCloud(body: EventModel) {
		try {
			const imageListRef = ref(storage, `images/events/${body.alias}`);
			const { items } = await listAll(imageListRef);

			for (const item of items) {
				await deleteObject(item);
			}

			return true;
		} catch (ex) {
			return false;
		}
	}

	async deleteExhibitionImagesFolderFromCloud(body: ExhibitionModel) {
		try {
			const imageListRef = ref(storage, `images/exhibitions/${body.alias}`);
			const { items } = await listAll(imageListRef);

			for (const item of items) {
				await deleteObject(item);
			}

			return true;
		} catch (ex) {
			return false;
		}
	}

	async deleteArtistImagesFolderFromCloud(body: ArtistModel) {
		const fullname = body.name + ' ' + body.surname + `(${body.nickname})`;
		try {
			const imagesListRef = ref(storage, `images/artists/${fullname}`);
			const avatarImagesListRef = ref(storage, `images/artists/${fullname}/Avatar`);
			const imagesResponse = await listAll(imagesListRef);
			const avatarImagesResponse = await listAll(avatarImagesListRef);

			for (const item of avatarImagesResponse.items) {
				await deleteObject(item);
			}

			for (const item of imagesResponse.items) {
				await deleteObject(item);
			}

			return true;
		} catch (ex) {
			return false;
		}
	}
}
