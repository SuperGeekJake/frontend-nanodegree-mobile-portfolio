/* jshint esversion: 6, node: true */
'use strict';

const gulp = require('gulp');
const run = require('run-sequence');
const del = require('del');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const tsify = require('tsify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const cssmin = require('gulp-cssmin');

gulp.task('clean', () => {
  return del(['dist']);
});

gulp.task('build:img', () => {
  return gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('build:html', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('build:js', function() {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('build:ts', function() {
  return browserify()
    .add('src/ts/main.ts')
    .plugin('tsify', {
      module: "commonjs",
      target: "es5",
      noImplicitAny: false,
      sourceMap: false
    })
    .bundle()
    .on('error', (error) => console.error(error.toString()))
    .pipe(source('pizza.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('build:css', function () {
	return gulp.src('src/css/*.css')
		.pipe(cssmin())
		.pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['clean'], (cb) => {
  return run(['build:html', 'build:css', 'build:img', 'build:ts', 'build:js'], cb);
});
