#! /usr/bin/env node

// flatifier package ~/Dropbox/Flaticons\ Shared/Icon\ Sets/Solid.psd

var commander = require('commander'),
	spawn = require('child_process').spawn,
	fs = require('fs'),
	rimraf = require('rimraf'),
	opener = require('./opener.js'),
	prompt = require('prompt');

commander.version('1.0.0');

prompt.start();

commander
	.command('package <psdPath>')
	.description('Flatify a Flaticons set PSD. Output will be in `~/Downloads/flatified/`.')
	.action(function(psdPath) {
		var home = process.env['HOME'] + '/';

		rimraf(home + 'Downloads/flatified', function() {
			fs.mkdirSync(home + 'Downloads/flatified');
			fs.mkdirSync(home + 'Downloads/flatified/psd');
			fs.mkdirSync(home + 'Downloads/flatified/ai');
			fs.mkdirSync(home + 'Downloads/flatified/svg');
			fs.mkdirSync(home + 'Downloads/flatified/png');
			fs.mkdirSync(home + 'Downloads/flatified/png/1x');
			fs.mkdirSync(home + 'Downloads/flatified/png/2x');
			fs.mkdirSync(home + 'Downloads/flatified/png/3x');
			fs.mkdirSync(home + 'Downloads/flatified/png/4x');
			fs.mkdirSync(home + 'Downloads/flatified/font');

			prompt.get('setName', function(err, setName) {
				var setName = setName.setName;

				opener.openPsd(psdPath);
			});
		});
	});

commander.parse(process.argv);
