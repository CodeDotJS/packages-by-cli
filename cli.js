#!/usr/bin/env node

'use strict';

const packagesBy = require('packages-by');

const colors = require('colors');

const argv = require('yargs')

    .usage(colors.cyan.bold('\nUsage: $0 -u [user.name]'))

    .demand(['u'])

    .describe('u', 'npm username')

    .argv;

packagesBy(argv.u).then(user => {
	const inf = [];

	const packageRow = (prefix, key) => {
		if (user[key]) {
			inf.push(`${prefix} ${user[key]}`);
		}
	};

	console.log('\n');

	packageRow(' ❱ npm user ' + colors.green.bold(argv.u) + ' has', 'packages');

	console.log(inf.join('\n'));

	console.log('\n');
});