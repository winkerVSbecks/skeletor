
var gulp = require('gulp');
var connect = require('gulp-connect');
var colors = require('colors');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var fileinclude = require('gulp-file-include');
var scsslint = require('gulp-scss-lint');


gulp.task('scss-lint', function () {
  return gulp.src('./scss/**/*.scss')
          .pipe(scsslint({
            'config': 'scss-lint.yml',
          }));
});


gulp.task('sass-docs', function() {
  return gulp.src('./scss/_docs/docs.scss')
          .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest('./css'))
          .pipe(cssmin())
          .pipe(rename({
            extname: '.min.css'
          }))
          .pipe(gulp.dest('./css'));
});


gulp.task('sass', ['scss-lint'], function() {
  return gulp.src('./scss/skeletor.scss')
          .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest('./css'))
          .pipe(cssmin())
          .pipe(rename({
            extname: '.min.css'
          }))
          .pipe(gulp.dest('./css'));
});


gulp.task('build-docs', function() {
  return gulp.src(['./docs/_index.html'])
          .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
          }))
          .pipe(rename({
            basename: 'index'
          }))
          .pipe(gulp.dest('./'))
          .pipe(connect.reload());
});


gulp.task('dev', ['sass', 'build-docs', 'sass-docs'], function() {
  // Start a server
  connect.server({
    root: '',
    port: 3000,
    livereload: true
  });
  console.log('[CONNECT] Listening on port 3000'.yellow.inverse);

  // Watch CSS files for changes
  console.log('[CONNECT] Watching files for live-reload'.blue);
  watch(['./index.html', './js/**/*.js'])
    .pipe(connect.reload());

  // Watch HTML files for changes
  gulp.watch('./docs/**/*.html', ['build-docs']);

  // Watch Sass files for changes
  console.log('[CONNECT] Watching SASS files'.blue);
  gulp.watch('./scss/**/*.scss', ['sass', 'sass-docs']);
});


gulp.task('default', [], function() {
  console.log('***********************'.yellow);
  console.log('  dev :'.magenta, 'starts a server with live reloading and auto compiling sass'.yellow);
  console.log('  sass:'.magenta, 'compiles sass'.yellow);
  console.log('***********************'.yellow);
  return true;
});
