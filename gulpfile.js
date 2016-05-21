const gulp = require('gulp');
const run = require('run-sequence');

gulp.task('clean', () => {
  const del = require('del');

  return del(['dist']);
});

gulp.task('build:img', () => {
  const imagemin = require('gulp-imagemin');

  gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('build:html', function() {
  const htmlmin = require('gulp-htmlmin');

  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

gulp.task('build:js', function() {
  const uglify = require('gulp-uglify');

  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('build:ts', function() {
  const browserify = require('browserify');
  const tsify = require('tsify');
  const uglify = require('gulp-uglify');
  const buffer = require('vinyl-buffer');
  const source = require('vinyl-source-stream');

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
  const cssmin = require('gulp-cssmin');

	gulp.src('src/css/*.css')
		.pipe(cssmin())
		.pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['clean'], (cb) => {
  run(['build:html', 'build:css', 'build:img', 'build:ts', 'build:js'], cb);
});
