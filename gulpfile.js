'use strict';

var babel      = require('node-babel')();
var gulp       = require('gulp');
var sass       = require('gulp-sass');
var bower      = require('gulp-bower');
var minifyHTML = require('gulp-minify-html');
var nodemon    = require('gulp-nodemon');
var copy       = require('gulp-copy');
var del        = require('del')
var config     = require('./config');
var wiredep    = require('wiredep').stream;


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
// Clean
//


gulp.task('clean', function () { del('./public'); });


//
// Copy
//


gulp.task('copy', ['copy:images', 'copy:fonts']);

gulp.task('copy:images', function() {
  del('./public/images/**/*');
  gulp.src(['app/assets/images/**/*']).pipe(gulp.dest('./public/images'));
});

gulp.task('copy:fonts', function() {
  del('./public/fonts/**/*');
  gulp.src(['app/assets/fonts/**/*']).pipe(gulp.dest('./public/fonts'));
});

gulp.task('copy:favicons', function() {
  del('./public/*.ico');
  gulp.src(['app/assets/images/favicons/*']).pipe(gulp.dest('./public/'));
});


//
// HTML
//


gulp.task('minify-html', function() {
  gulp.src('./app/**/*.html')
    .pipe(minifyHTML())
    .pipe(wiredep({
    })
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
// Watch
//


gulp.task('watch', function () {
  gulp.watch('./app/**/*.scss', ['sass']);
  gulp.watch('./app/assets/images/**/*.*', ['copy:images']);
  gulp.watch('./app/assets/fonts/**/*.*', ['copy:fonts']);
});


//
// Primary
//


gulp.task('default', ['sass', 'minify-html', 'copy', 'watch', 'nodemon']);

gulp.task('build', ['sass', 'minify-html', 'copy']);

gulp.task('serve', function () {
  exec('node --harmony server', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
