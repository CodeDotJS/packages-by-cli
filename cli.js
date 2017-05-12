#!/usr/bin/env node

'use strict';

const dns = require('dns');
const got = require('got');
const cheerio = require('cheerio');
const logUpdate = require('log-update');
const ora = require('ora');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({pkg}).notify();
const arg = process.argv[2];
const spinner = ora();

if (!arg) {
	console.log(`
 Usage: packages-by <user>

 Example :
   $ packages-by feross
   `);
	process.exit(1);
}

dns.lookup('npmjs.com', err => {
	if (err) {
		logUpdate('\n› Please check your internet connection!\n');
		process.exit(1);
	} else {
		logUpdate();
		spinner.text = `Fetching`;
		spinner.start();
	}
});

const url = `https://npmjs.com/~${arg}`;

got(url).then(res => {
	const $ = cheerio.load(res.body);
	const count = $('.undecorated').text().trim();
	logUpdate(`\n› ${count}\n`);
	spinner.stop();
}).catch(err => {
	if (err) {
		logUpdate(`\n› ${arg} is not a npm user\n`);
		process.exit(1);
	}
});
