var adobeTools = require('./adobeTools.js');

function exportify() {
	adobeTools.runJsx('photoshop', 'psExporter', function() {
		exportifyAi();
	});
}

function exportifyAi() {
	adobeTools.runJsx('illustrator', 'aiExporter', function() {

	});
}



module.exports.exportify = exportify;