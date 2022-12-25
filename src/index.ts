#!/usr/bin/env node --experimental-specifier-resolution=node

import 'reflect-metadata';
import program from './commands/index.js';

program.parse();
