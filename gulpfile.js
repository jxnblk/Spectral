
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');

gulp.task('default', function() {
  console.log('herro');
  gulp.src('./src/index.js')
    .pipe(browserify())
    .pipe(rename('app.js'))
    .pipe(gulp.dest('./js'));
});

gulp.task('serve', function() {
  browserSync({ server: { baseDir: './' } , open: false, ghostMode: false });
});

