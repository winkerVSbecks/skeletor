
var gulp = require('gulp');
var connect = require('gulp-connect');
var colors = require('colors');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var fileinclude = require('gulp-file-include');
var cssStats = require('gulp-cssstats');
var postcss = require('gulp-postcss');
var gulpIgnore = require('gulp-ignore');
var scsslint = require('gulp-scss-lint');


gulp.task('cssstats', function() {
  return gulp.src('./css/skeletor.css')
          .pipe(cssStats())
          .pipe(gulp.dest('./css/'));
});


gulp.task('scss-lint', function () {
  return gulp.src('./scss/**/*.scss')
          .pipe(scsslint({
            'config': 'scss-lint.yml',
          }));
});


gulp.task('sass', ['scss-lint'], function(done) {
  gulp.src('./scss/skeletor.scss')
    .pipe(sass({
      sourcemap: false,
      sourcemapPath: '../scss'
    }))
    .on('error', function (err) {
      console.log(err.message);
    })
    .pipe(gulp.dest('./css/'))
    .pipe(gulpIgnore.exclude(function(file) {
      if (file.path.indexOf('.map') !== -1) {
        return true;
      } else {
        return false;
      }
    }))
    .pipe(minifyCss())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./css/'))
    .pipe(connect.reload())
    .on('end', done);
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


gulp.task('dev', ['sass', 'build-docs'], function() {
  // Start a server
  connect.server({
    root: '',
    port: 3000,
    livereload: true
  });
  console.log('[CONNECT] Listening on port 3000'.yellow.inverse);

  // Watch HTML files for changes
  console.log('[CONNECT] Watching files for live-reload'.blue);
  watch(['./index.html', './js/**/*.js', './css/stats/*'])
    .pipe(connect.reload());

  gulp.watch('./docs/**/*.html', ['build-docs']);

  // Watch HTML files for changes
  console.log('[CONNECT] Watching SASS files'.blue);
  gulp.watch('./scss/*.scss', ['sass']);
});


gulp.task('default', [], function() {
  console.log('***********************'.yellow);
  console.log('  dev :'.magenta, 'starts a server with live reloading and auto compiling sass'.yellow);
  console.log('  sass:'.magenta, 'compiles sass'.yellow);
  console.log('  cssstats:'.magenta, 'calculate CSS stats'.yellow);
  console.log('***********************'.yellow);
  return true;
});