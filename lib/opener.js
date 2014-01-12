var fs = require('fs'),
	spawn = require('child_process').spawn,
	adobeTools = require('./adobeTools.js'),
	psExporter = require('./psExporter.js');

function createPsdOpener(psdPath) {
	fs.writeFileSync(__dirname + '/../jsx/psdOpener.jsx', 'var f = new File("' + psdPath + '");app.open(f);alert("opener finished.");');
}

function deletePsdOpener() {
	fs.unlinkSync(__dirname + '/../jsx/psdOpener.jsx');
}

function openPsd(psdPath) {
	if (!fs.existsSync(psdPath)) {
		throw new Error("Specified PSD does not exist.");
		process.exit(1);
	}

	createPsdOpener(psdPath);

	adobeTools.runJsx('photoshop', 'psdOpener', function() {
		deletePsdOpener();

		psExporter.exportify();
	});
}

module.exports.openPsd = openPsd;