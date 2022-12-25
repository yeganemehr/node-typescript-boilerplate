import { program } from "commander";
import moment from "moment";
import { singleton } from "tsyringe";
import winston, { LeveledLogMethod } from "winston";
import { IService } from "../IService.js";
import ConfigManager, { ILoggingConfig } from "./Config.js";
import * as stringify from 'safe-stable-stringify';

@singleton()
export default class Logger implements IService {
	public winston?: winston.Logger;

	public constructor(protected config: ConfigManager) {
	}

	public async init(): Promise<void> {
		const config = this.config.data.logging;
		const opts = program.opts() as {
			'logLevel'?: ILoggingConfig['level'],
			'logFile'?: string;
			'verbose'?: boolean;
		};
		if (opts.logLevel !== undefined) {
			config.level = opts.logLevel;
		}
		if (opts.logFile !== undefined) {
			config.file = opts.logFile;
		}
		if (opts.verbose !== undefined) {
			config.console = opts.verbose;
		}

		const logFormat = winston.format.printf((log) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const stringifiedRest = (stringify as any).default(Object.assign({}, log, {
				level: undefined,
				message: undefined,
				splat: undefined
			}));
			const rest = stringifiedRest !== "{}" ? " " + stringifiedRest : "";
			return `${moment().toISOString(true)} [${log.level}]: ${log.message}${rest}`;
		});

		const transports: winston.transport[] = [];
		if (config !== undefined) {
			if (config.console) {
				transports.push(new winston.transports.Console({
					format: winston.format.combine(
						winston.format.colorize({ all: true }),
						logFormat,
					)
				}));
			}
			if (config.file !== undefined) {
				transports.push(new winston.transports.File({ filename: config.file }));
			}
		}

		this.winston = winston.createLogger({
			transports,
			format: logFormat,
			level: config.level,
		});
	}
	public get error() : LeveledLogMethod {
		if (this.winston === undefined) {
			throw new Error("logger service is not inited, yet");
		}
		return this.winston.error.bind(this.winston);
	}
	public get warn() : LeveledLogMethod {
		if (this.winston === undefined) {
			throw new Error("logger service is not inited, yet");
		}
		return this.winston.warn.bind(this.winston);
	}

	public get help() : LeveledLogMethod {
		if (this.winston === undefined) {
			throw new Error("logger service is not inited, yet");
		}
		return this.winston.help.bind(this.winston);
	}

	public get data() : LeveledLogMethod {
		if (this.winston === undefined) {
			throw new Error("logger service is not inited, yet");
		}
		return this.winston.data.bind(this.winston);
	}

	public get info() : LeveledLogMethod {
		if (this.winston === undefined) {
			throw new Error("logger service is not inited, yet");
		}
		return this.winston.info.bind(this.winston);
	}

	public get debug() : LeveledLogMethod {
		if (this.winston === undefined) {
			throw new Error("logger service is not inited, yet");
		}
		return this.winston.debug.bind(this.winston);
	}

	public get prompt() : LeveledLogMethod {
		if (this.winston === undefined) {
			throw new Error("logger service is not inited, yet");
		}
		return this.winston.prompt.bind(this.winston);
	}

	public get http() : LeveledLogMethod {
		if (this.winston === undefined) {
			throw new Error("logger service is not inited, yet");
		}
		return this.winston.http.bind(this.winston);
	}

	public get verbose() : LeveledLogMethod {
		if (this.winston === undefined) {
			throw new Error("logger service is not inited, yet");
		}
		return this.winston.verbose.bind(this.winston);
	}

	public get input() : LeveledLogMethod {
		if (this.winston === undefined) {
			throw new Error("logger service is not inited, yet");
		}
		return this.winston.input.bind(this.winston);
	}

	public get silly() : LeveledLogMethod {
		if (this.winston === undefined) {
			throw new Error("logger service is not inited, yet");
		}
		return this.winston.silly.bind(this.winston);
	}

}
