'use strict';

var babel      = require('node-babel')(); // does this even work?
// var harmonize  = require("harmonize")();
var gulp       = require('gulp');
var sass       = require('gulp-sass');
var bower      = require('gulp-bower');
var minifyHTML = require('gulp-minify-html');
var nodemon    = require('gulp-nodemon');
var copy       = require('gulp-copy');
var config     = require('./config');


//
// Server
//


gulp.task('nodemon', function () {
  nodemon({
    script: 'server/server.js',
    ext: 'js',
    execMap: {
      js: "babel-node --harmony"
    },
    env: {
      NODE_ENV : config.environment,
      PORT     : config.port
    }
  })
});


//
// Copy
//


gulp.task('copy:images', function() {
  gulp.src(['app/assets/images/**/*']).pipe(gulp.dest('./build'));
});


gulp.task('copy:fonts', function() {
  gulp.src(['app/assets/images/**/*']).pipe(gulp.dest('./build'));
});



//
// HTML
//


gulp.task('minify-html', function() {
  gulp.src('./app/**/*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('./public/'));
});


//
// SASS
//


gulp.task('sass', function () {
  gulp.src('./app/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});


//
// SASS
//


gulp.task('watch', function () {
  gulp.watch('./app/**/*.scss', ['sass']);
  gulp.watch('./app/assets/images/**/*.*', ['copy:images']);
  gulp.watch('./app/assets/fonts/**/*.*', ['copy:fonts']);
});


//
// Primary
//


gulp.task('default', ['sass', 'minify-html', 'watch', 'nodemon']);

gulp.task('serve', function () {
  exec('node --harmony server', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
