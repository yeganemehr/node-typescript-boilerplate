
import Ajv from 'ajv';
import { singleton } from 'tsyringe';
import * as fs from 'fs/promises';
import path from "path";
import url from "url";
import { IService } from '../IService.js';

export interface ILoggingConfig {
	file: string;
	console: boolean;
	level: string;
}

export interface IConfigData {
	logging: ILoggingConfig;
}

@singleton()
export default class Config implements IService {

	public static getDefaultSchemaPath(): string {
		return path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "..", "..", "config-schema.json");
	}

	public static getDefaultConfigPath(): string {
		return path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "..", "..", "config.json");
	}

	public configPath?: string;
	public schemaPath?: string;
	protected _data?: IConfigData;

	public init(): Promise<void> {
		return this.reload();
	}

	public getConfigPath(): string {
		return this.configPath || Config.getDefaultConfigPath();
	}

	public getSchemaPath(): string {
		return this.schemaPath || Config.getDefaultSchemaPath();
	}


	public async reload(): Promise<void> {
		this._data = await this.reread();
	}

	public async reread(): Promise<IConfigData> {
		const [content, schemaString] = await Promise.all([
			fs.readFile(this.getConfigPath(), { encoding: "utf-8" }),
			fs.readFile(this.getSchemaPath(), { encoding: "utf-8" }),
		]);
		const data = JSON.parse(content);
		const schema = JSON.parse(schemaString);

		const ajv = new Ajv();
		const validate = ajv.compile(schema);

		if (!validate(data)) {
			console.error(validate.errors);
			throw new Error('config validation failed');
		}

		return data;
	}



	get data(): IConfigData {
		if (this._data === undefined) {
			throw new Error("Config is not inited yet");
		}
		return this._data;
	}

}
