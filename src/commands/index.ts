import { program, Option } from 'commander';
import Config from '../services/Config.js';
import start from "./start.js";

program.addOption(new Option('-c, --config <file>', 'Path to config file').default(Config.getDefaultConfigPath()));
program.addCommand(start);
export default program;
