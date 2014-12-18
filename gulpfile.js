
var gulp = require('gulp');
var connect = require('gulp-connect');
var colors = require('colors');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

gulp.task('sass', function(done) {
  gulp.src('./scss/skeletor.scss')
    .pipe(sass({
      sourcemap: false,
      sourcemapPath: '../scss'
    }))
    .on('error', function (err) {
      console.log(err.message);
    })
    .pipe(gulp.dest('./css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./css/'))
    .pipe(connect.reload())
    .on('end', done);
});


gulp.task('dev', ['sass'], function() {
  // Start a server
  connect.server({
    root: '',
    port: 3000,
    livereload: true
  });
  console.log('[CONNECT] Listening on port 3000'.yellow.inverse);

  // Watch HTML files for changes
  console.log('[CONNECT] Watching files for live-reload'.blue);
  watch(['./index.html', './js/**/*.js'])
    .pipe(connect.reload());

  // Watch HTML files for changes
  console.log('[CONNECT] Watching SASS files'.blue);
  gulp.watch('./scss/*.scss', ['sass']);
});


gulp.task('default', [], function() {
  console.log('***********************'.yellow);
  console.log('  dev :'.magenta, 'starts a server with live reloading and auto compiling sass'.yellow);
  console.log('  sass:'.magenta, 'compiles sass'.yellow);
  console.log('***********************'.yellow);
  return true;
});