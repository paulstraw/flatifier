var adobeTools = require('./adobeTools.js'),
	jsonGenerator = require('./jsonGenerator.js');

function exportify() {
	adobeTools.runJsx('photoshop', 'psExporter', function() {
		exportifyAi();
	});
}

function exportifyAi() {
	adobeTools.runJsx('illustrator', 'aiExporter', function() {
		jsonGenerator.exportJson();
	});
}


module.exports.exportify = exportify;
