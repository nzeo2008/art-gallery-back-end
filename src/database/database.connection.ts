import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from './../types';
import mongoose from 'mongoose';
import { IDatabaseConnection } from './database.connection.interface';
import { ILogger } from './../logger/logger.interface';

@injectable()
export class DatabaseConnection implements IDatabaseConnection {
	private _uri: string;

	constructor(
		@inject(TYPES.ConfigService) private readonly configService: IConfigService,
		@inject(TYPES.LoggerService) private readonly logger: ILogger,
	) {
		this._uri = this.generateUri();
	}

	generateUri(): string {
		return `mongodb+srv://${this.configService.get('MONGO_LOGIN')}:${this.configService.get(
			'MONGO_PASSWORD',
		)}@cluster0.x7madcf.mongodb.net/?retryWrites=true&w=majority`;
	}

	async getConnection() {
		try {
			await mongoose.connect(this._uri);
			this.logger.info('[DatabaseConnection] Подключение к базе данных прошло успешно');
		} catch ({ codeName, code }) {
			if (!codeName) {
				return this.logger.error(`[DatabaseConnection] Сервер базы данных не отвечает`);
			}

			this.logger.error(
				`[DatabaseConnection] Ошибка в подключении к базе данных: ${codeName} - код ${code}`,
			);
		}
	}
}
