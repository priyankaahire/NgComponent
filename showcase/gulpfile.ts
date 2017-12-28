/**
 * Gulp.ts is what we call a JavaScript Task Runner helps us
 * automate repetitive tasks such as minification, compilation, unit testing,
 * linting, etc. Gulp.ts does not revolutionize automation but simplifies
 * it tremendously.
 */

// including plugins
"use strict";
const gulp = require("gulp");
const del = require("del");
const pump = require('pump');
const runSequence = require('run-sequence');
const tsc = require("gulp-typescript");
const tsProject = tsc.createProject("tsconfig.json");
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const csslint = require('gulp-csslint');
const jslint = require('gulp-jslint');
const cleanCSS = require('gulp-clean-css');
const csscomb = require('gulp-csscomb');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const metrics = require('gulp-tsmetrics');

gulp.task('default', function () {
});

/**
 * Remove build directory.
 */
gulp.task('clean', (cb) => {
  return del(["build"], cb);
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
  return gulp.src("src/**/*.ts")
    .pipe(tslint({
      formatter: "verbose"
    }))
    .pipe(tslint.report());
});

/**
 * Automated linting of Cascading Stylesheets
 */
gulp.task('csslint', function () {
  return gulp.src(['src/**/*.scss', 'src/assets/styles/*.scss'])
    .pipe(csslint())
    .pipe(csslint.formatter());
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task("compile", () => {
  let tsResult = gulp.src("src/**/*.ts")
    .pipe(sourcemaps.init())
    .pipe(tsProject());
  return tsResult.js
    .pipe(sourcemaps.write(".", { sourceRoot: '/src' }))
    .pipe(gulp.dest("build"));
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", () => {
  return gulp.src(["src/**/*", "!**/*.ts", "!**/*.scss"])
    .pipe(gulp.dest("build"));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", () => {
  return gulp.src([
    'core-js/client/shim.min.js',
    'core-js/client/shim.min.js.map',
    'reflect-metadata/Reflect.js',
    'reflect-metadata/Reflect.js.map',
    'systemjs/dist/*.*',
    'rxjs/**/*.*',
    'zone.js/dist/**',
    '@angular/**/*.*',
    'moment/**/*.*'
  ], { cwd: "node_modules/**" }) /* Glob required here. */
    .pipe(gulp.dest("build/lib"));
});

/**
 * Copy all stylesheets that are not TypeScript files into build directory.
 * Automated merge of all scss into single css and minification of Cascading Stylesheets
 */
gulp.task('styles', () => {
  return gulp.src(["src/assets/styles/*.scss"])
    .pipe(sass().on('error', sass.logError))
    .pipe(csscomb())
    .pipe(gulp.dest('build/assets/styles'));
});
//==============================================================================

/**
 * Copy all required javascript libraries into build directory.
 */
gulp.task("scripts", () => {
  return gulp.src([
    'components/**/*.*',
    'directives/*.*',
    'interface/*.*',
    'pipes/**/*.*',
    'models/*.*',
    'services/*.*',
    'providers/*.*',
    'index.js',
    'index.js.map'
  ], { cwd: "build/app/shared/**" }) /* Glob required here. */
    .pipe(gulp.dest("build/dist/@ngcomponents"));
});

/**
 * Copy all required typings into build directory.
 */
gulp.task('typings', () => {
  return gulp.src([
    'components/**/*.ts',
    'directives/*.ts',
    'interface/*.ts',
    'pipes/**/*.ts',
    'services/*.ts',
    'providers/*.ts',
    'models/*.ts',
    'index.ts'
  ], { cwd: "src/app/shared/**" }) /* Glob required here. */
    .pipe(tsProject()).dts.pipe(gulp.dest('build/dist/@ngcomponents'));
});

/**
 * Copy assets from build directory into @ngcomponents directory.
 */
gulp.task('assets', () => {
  return gulp.src([
    'fonts/*.*',
    'icons/**/*.*',
    'images/*.*',
    'styles/*.*'
  ], { cwd: "build/assets/**" })
    .pipe(csscomb())
    .pipe(gulp.dest('build/dist/@ngcomponents/assets'));
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {
  gulp.watch(["src/**/*.ts"], ['compile']).on('change', function (e) {
    console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
  });
  gulp.watch(["src/**/*.html"], ['resources']).on('change', function (e) {
    console.log('Resource file ' + e.path + ' has been changed. Updating.');
  });
  gulp.watch(['src/**/*.scss'], ['styles']).on('change', function (e) {
    console.log('Resource file ' + e.path + ' has been changed. Updating.');
  });
});

/**
 * Build the project.
 */
// gulp.task('build', gulp.series('tslint', 'csslint', 'compile', 'resources', 'libs', 'styles', 'minify-css'))
gulp.task('build', function (done) {
  runSequence('tslint', 'csslint', 'compile', 'resources', 'libs', 'styles', 'scripts', 'typings', 'assets', function () {
    console.log('building the project ...');
    done();
  });
});
