// * each layer
// 	* copy to appropriately-sized psd
// 	* save psd
// 	* save ai
// 	* save png
// 		* resize 200%, save png
// 		* resize 300%, save png
// 		* resize 400%, save png
(function() {
	var iconsDoc = app.activeDocument,
		layerSetsLength = iconsDoc.layerSets.length;

	// make sure we're using pixels for everything
	app.preferences.rulerUnits = Units.PIXELS;
	app.preferences.typeUnits = TypeUnits.PIXELS;

	function exportIconLayer(iconLayer) {
		var bounds = iconLayer.bounds, // bounds: distance from top left to [left, top, right, bottom]
			width = Math.abs(bounds[2].value - bounds[0].value),
			height = Math.abs(bounds[3].value - bounds[1].value);

		// create a new document sized for this icon, and duplicate it there
		var iconDoc = app.documents.add(width, height, 72, iconLayer.name, NewDocumentMode.RGB, DocumentFill.TRANSPARENT);
		iconDoc.layerSets.add();

		// switch to the old document, duplicate our icon to the new document, and switch back to the new document
		app.activeDocument = iconsDoc;
		iconLayer.duplicate(iconDoc.layerSets[0]);
		app.activeDocument = iconDoc;

		// grab a reference to our newly-duplicated instance of iconLayer
		var dupIconLayer = iconDoc.layerSets[0].artLayers[0];

		// move dupIconLayer to 0x0
		dupIconLayer.translate(- bounds[0].value, - bounds[1].value);

		// do all the exporting magic

		// first PSD
		var psdFilePath = new File('~/Downloads/flatified/psd/' + iconLayer.name + '.psd');
		iconDoc.saveAs(psdFilePath);

		// then AI
		var aiFilePath = new File('~/Downloads/flatified/ai/' + iconLayer.name + '.ai'),
			illustratorExportOpts = new ExportOptionsIllustrator;

		illustratorExportOpts.path = IllustratorPathType.NAMEDPATH;
		illustratorExportOpts.pathName = name + ' Shape Path';
		iconDoc.exportDocument(aiFilePath, ExportType.ILLUSTRATORPATHS, illustratorExportOpts);

		// finally PNG
		for (var x = 1; x <= 4; x++) {
			var pngFilePath = new File('~/Downloads/flatified/png/' + x + 'x/' + iconLayer.name + '.png'),
				pngExportOpts = new ExportOptionsSaveForWeb();

			pngExportOpts.format = SaveDocumentType.PNG;
			pngExportOpts.PNG8 = false;

			iconDoc.resizeImage(width * x, height * x); // scale image
			iconDoc.exportDocument(pngFilePath, ExportType.SAVEFORWEB, pngExportOpts); // export png
			iconDoc.resizeImage(width, height); // resize back to native
		}


		// close our temp doc, and switch back to the document with all the icons
		iconDoc.close(SaveOptions.DONOTSAVECHANGES);
		app.activeDocument = iconsDoc;
	}

	// for (var i = 0; i < 1; i++) {
	for (var i = 0; i < layerSetsLength; i++) {
		var layerSet = iconsDoc.layerSets[i],
			artLayersLength = layerSet.artLayers.length;

		// if (layerSet.name == 'BG' || !layerSet.artLayers || !layerSet.artLayers.length) {
		// 	continue;
		// }

		// parse layerSet children
		for (var j = 0; j < 1; j++) {
		// for (var j = 0; j < artLayersLength; j++) {
			exportIconLayer(layerSet.artLayers[j]);
		}
	}

	alert('psExporter finished.');
})();