
import 'dotenv/config';
import { container, singleton } from "tsyringe";
import { IService } from './IService.js';
import Config from './services/Config.js';
import Logger from './services/Logger.js';

@singleton()
export default class App implements IService {

    public readonly services = [
        Config,
        Logger,
    ];

    public async init(): Promise<void> {
        for (const service of this.services) {
            const object = container.resolve<typeof service["prototype"]>(service);
            await object.init();
        }
    }
}