'use strict';

// -----------------------------------------------
// Add requires
// -----------------------------------------------
var autoprefixer  = require('gulp-autoprefixer');
var browserSync   = require('browser-sync').create();
var reload        = browserSync.reload;
var critical      = require('critical').stream;
var cssnano       = require('gulp-cssnano');
var concat        = require('gulp-concat');
var gulp          = require('gulp');
var gzip          = require('gulp-gzip');
var imagemin      = require('gulp-imagemin');
var include       = require('gulp-include');
var opn           = require('opn');
var pngquant      = require('imagemin-pngquant');
var pug           = require('gulp-pug');
var rename        = require('gulp-rename');
var sass          = require('gulp-sass');
var sourcemaps    = require('gulp-sourcemaps');
var uglify        = require('gulp-uglify');
var {log, colors} = require('gulp-util');

// -----------------------------------------------
// Set Paths and Files
// -----------------------------------------------

var fontFiles = [
    'src/fonts/**/*.*'
];

//************************************************************
// Only activate if JQuery has been installed with bower
//************************************************************
// var bowerPath = 'bower_components/';
var jsFiles = [
    // bowerPath + 'jquery/dist/jquery.js',
    // bowerPath + 'include-media-export/dist/include-media-1.0.1.min.js',
    // npmPath + 'fontfaceobserver/fontfaceobserver.standalone.js',
    './src/js/app.js',
];

var paths = {
    images: './src/images/**/*.*',
    pug: './src/views/**/*.pug',
    sass: './src/sass/**/*.sass',
    scripts: './src/js/**/*.js'
};

// --------------------------------------
// Browser Sync Task
// --------------------------------------

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
});

// -----------------------------------------------
// JS Task (Dev & Build)
// -----------------------------------------------

gulp.task('js', function() {
    return gulp
        .src(jsFiles)
        .pipe(sourcemaps.init())
        .pipe(include())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('js-build', function() {
    return gulp
        .src(jsFiles)
        .pipe(include())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../../htdocs/js'))
        .pipe(gzip())
        .pipe(gulp.dest('../../htdocs/js'));
});

// -----------------------------------------------
// SASS Task (Dev & Build)
// -----------------------------------------------

gulp.task('sass', function() {
  return gulp.src(paths.sass)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist/css'))
      .pipe(autoprefixer())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./dist/css'))
      .pipe(reload({
          stream: true,
      }));
});

gulp.task('sass-build', function() {
  return gulp.src('./dist/css/app.css')
      .pipe(cssnano({
        discardComments: {
            removeAll: true
        }
      }))
      .pipe(gulp.dest('./build/css'))
      .pipe(gzip())
      .pipe(gulp.dest('./build/css'))
      .pipe(rename('app.min.css'));
});

// --------------------------------------
// Pug Task (Dev & Build)
// --------------------------------------

gulp.task('pug', function() {
  return gulp.src(paths.pug)
      .pipe(pug({
          pretty: true,
          locals: {
              env: 'dev'
          }
      }))
      .pipe(gulp.dest('./dist'))
      .pipe(reload({
          stream: true,
      }));
});

gulp.task('pug-build', function() {
    return gulp.src('./src/views/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./build'))
        .pipe(gzip())
        .pipe(gulp.dest('./build'));
});

// --------------------------------------
// Images Task (Dev & Build)
// --------------------------------------

gulp.task('images', function() { 
  return gulp.src(paths.images) 
    .pipe(gulp.dest('./dist/images')); 
});

gulp.task('images-build', function() { 
    return gulp.src(paths.images) 
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false,
              },],
            use: [pngquant()],
          }))
        .pipe(gulp.dest('./build/images')); 
});

// --------------------------------------
// Fonts Task (Dev & Build)
// --------------------------------------

gulp.task('fonts', function() { 
  return gulp.src(fontFiles) 
    .pipe(gulp.dest('./dist/fonts')); 
});

gulp.task('fonts-build', function() { 
    return gulp.src(fontFiles) 
        .pipe(gulp.dest('./build/fonts')); 
});

// --------------------------------------
// Watch Task ----------
// --------------------------------------

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.scripts, ['js']);
  gulp.watch(paths.pug, ['pug']);
  gulp.watch(paths.images, ['images']);
});

// --------------------------------------
// Critical Task ----------
// --------------------------------------

gulp.task('critical', function () {
    return gulp.src('../../htdocs/index.html')
        .pipe(critical({
            base: '../../htdocs/',
            inline: true,
            minify: true,
            css: ['../../htdocs/css/app.css']
            }))
        .on('error', err => log(colors.red(err.message)) )
        .pipe(gulp.dest('../../htdocs/'));
});


// --------------------------------------
// Dev & Prod Task
// --------------------------------------

gulp.task('default', ['watch', 'browser-sync', 'sass', 'pug', 'images', 'fonts', 'js']);
gulp.task('build', ['sass-build', 'images-build', 'fonts-build', 'pug-build', 'js-build'], function(){
    return gulp.src('./build/**/*.*')
        .pipe(gulp.dest('../../htdocs/')); 
})
