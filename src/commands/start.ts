import { Command } from 'commander';
import { container } from 'tsyringe';
import App from '../App.js';
import Logger from '../services/Logger.js';

const command = new Command('start');
command.description('Start the program');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
command.action(async (_args) => {
	const app = container.resolve(App);
	await app.init();

	const logger = container.resolve(Logger);
	logger.info("All Services Are Up And Running!");
});
export default command;