(function(global) {

    var paths = {
        // paths serve as alias
        'npm:': 'lib/'
    };
    // map tells the System loader where to look for things
    var map = {
        'app': 'app',
        'rxjs': 'npm:rxjs',
        'moment': 'npm:moment',
        '@angular': 'npm:@angular',
        '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
        '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
        '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
        '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
        '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
        '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
        '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
        '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        'moment': { defaultExtension: 'js' },
        '@angular': { defaultExtension: 'js' }
    };
    var config = {
        paths: paths,
        map: map,
        packages: packages,
        transpiler: 'ts',
        typescriptOptions: {
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            module: "commonjs",
        },
        meta: {
            'typescript': {
                "exports": "ts"
            }
        }
    };

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) { global.filterSystemConfig(config); }

    System.config(config);

})(this);