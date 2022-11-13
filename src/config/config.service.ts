import { DotenvParseOutput, config, DotenvConfigOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { LoggerService } from './../logger/logger.service';
import { TYPES } from '../types';
import { IConfigService } from './config.service.interface';
import 'reflect-metadata';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;

	constructor(@inject(TYPES.LoggerService) private readonly logger: LoggerService) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('[ConfigService] Ошибка загрузки файла конфигурации');
		} else {
			this.config = result.parsed as DotenvParseOutput;
			this.logger.info('[ConfigService] Файл конфигурации успешно загружен');
		}
	}

	get(key: string) {
		return this.config[key];
	}
}
