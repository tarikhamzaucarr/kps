#target illustrator

app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;

function logError(msg) {
    var f = new File("/Users/tarikhamzaucar/Desktop/Yeditepe Yacht /claude/ai_error_light.txt");
    f.open("a");
    f.writeln(msg);
    f.close();
}

function processPage(pageNum) {
    try {
        logError("Processing page " + pageNum);
        var pdfOptions = app.preferences.PDFFileOptions;
        pdfOptions.pageToOpen = pageNum;
        
        var pdfPath = "/Users/tarikhamzaucar/Desktop/Yeditepe Yacht /claude/temp_print_light.pdf";
        var fileToOpen = new File(pdfPath);
        
        var doc = app.open(fileToOpen);
        logError("Opened PDF page " + pageNum);
        
        try {
            app.executeMenuCommand("doc-color-cmyk");
            logError("Color converted to CMYK");
        } catch(e) { logError("Color convert error: " + e.message); }
        
        try {
            var tfCount = doc.textFrames ? doc.textFrames.length : 0;
            if (tfCount > 0) {
                for (var i = tfCount - 1; i >= 0; i--) {
                    try { doc.textFrames[i].createOutline(); } catch(e) {}
                }
            }
        } catch(e) {}
        
        var saveOpts = new PDFSaveOptions();
        saveOpts.trimMarks = true;
        saveOpts.preserveEditability = false;
        
        var b = 8.503937; // 3mm
        saveOpts.bleedOffsetRect = [b, b, b, b];
        
        var outPath = "/Users/tarikhamzaucar/Desktop/Yeditepe Yacht /claude/index_Baski_Hazir_Sayfa" + pageNum + ".pdf";
        var outFile = new File(outPath);
        
        doc.saveAs(outFile, saveOpts);
        logError("Saved to: " + outPath);
        
        doc.close(SaveOptions.DONOTSAVECHANGES);
        logError("Closed document");
    } catch(e) {
        logError("Main loop error on page " + pageNum + ": " + e.message);
    }
}

logError("=== SCRIPT BOOT ===");
processPage(1);
processPage(2);
logError("=== SCRIPT BOOT END ===");
