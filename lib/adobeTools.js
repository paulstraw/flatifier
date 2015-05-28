var spawn = require('child_process').spawn,
	photoshopPath = '/Applications/Adobe\ Photoshop\ CC\ 2014/Adobe\ Photoshop\ CC\ 2014.app',
	illustratorPath = '/Applications/Adobe\ Illustrator\ CC\ 2014/Adobe\ Illustrator.app',
	prompt = require('prompt');

function runJsx(app, jsxFile, cb) {
	// open -a APPPATH SCRIPTPATH
	if (app == 'photoshop') {
		appPath = photoshopPath
	} else if (app == 'illustrator') {
		appPath = illustratorPath
	}

	prompt.start();

	var cmd = 'open',
		params = ['-a', appPath, __dirname + '/../jsx/' + jsxFile + '.jsx'],
		jsxProcess = spawn(cmd, params);

	jsxProcess.stdout.on('data', function (data) {
		console.log('stdout: ' + data);
	});

	jsxProcess.stderr.on('data', function (data) {
		console.log('stderr: ' + data);
	});

	jsxProcess.on('exit', function(code) {
		prompt.confirm('Press enter when "' + jsxFile + '" has finished running', function() {
			// console.log('Finished process for ' + jsxFile + ' with code ' + code);

			if (cb && typeof cb == 'function') {
				cb();
			}
		});
	});
}

// module.exports.photoshopPath = photoshopPath;
// module.exports.illustratorPath = illustratorPath;
module.exports.runJsx = runJsx;
