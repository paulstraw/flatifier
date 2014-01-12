(function() {
	app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;

	var aiFolder = new Folder('~/Downloads/flatified/ai'),
		files = aiFolder.getFiles(),
		openOpts = new OpenOptions(),
		svgOpts = new ExportOptionsSVG(),
		filesLength = files.length,
		fillColor = new RGBColor();

	// #5D727C
	fillColor.red = 93
	fillColor.green = 114
	fillColor.blue = 124

	openOpts.convertCropAreaToArboard = true;
	openOpts.preserveLegacyArtboard = false;

	function saveFileAsSvg(file) {
		var doc = app.open(file, DocumentColorSpace.RGB, openOpts),
			fileName = doc.name.split(' [')[0],
			destFile = new File('~/Downloads/flatified/svg/' + fileName + '.svg'),
			paths = doc.pathItems,
			pathsLength = paths.length;

		for (var j = 0; j < pathsLength; j++) {
			paths[j].fillColor = fillColor;
		}

		doc.exportFile(destFile, ExportType.SVG);

		doc.close();
	}

	for (var i = 0; i < filesLength; i++) {
		saveFileAsSvg(files[i]);
	}

	alert('aiExporter finished.');
})();