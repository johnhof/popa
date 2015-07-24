var gulp = require('gulp');


'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');



//
// SASS
//

gulp.task('sass', function () {
  gulp.src('./app/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

//
// Primary
//

gulp.task('default', function() {
  // place code for your default task here
});
