'use strict';

// Include Gulp and other build automation tools and utilities
// See: https://github.com/gulpjs/gulp/blob/master/docs/API.md
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var path = require('path');
var runSequence = require('run-sequence');
var webpack = require('webpack');
var browserSync = require('browser-sync');
var argv = require('minimist')(process.argv.slice(2));

// Settings
var destination = './build';                  // The build output folder
var isRelease = !!argv.release;               // Minimize and optimize during a build?
var watch = false;
var src = {};

// The default task
gulp.task('default', ['serve']);

// Clean up
gulp.task('clean', del.bind(null, [destination]));

// 3rd party fonts
gulp.task('fonts', function () {
    gulp.src('./node_modules/bootstrap/dist/fonts/**')
      .pipe(gulp.dest(destination + '/fonts'));
});

// Static files
gulp.task('assets', function () {
    src.assets = 'src/assets/**';

    return gulp.src(src.assets)
        .pipe($.changed(destination))
        .pipe(gulp.dest(destination))
        .pipe($.size({title: 'assets'}));
});

// HTML pages
gulp.task('pages', function () {
    src.pages = 'src/*.html';
    return gulp.src(src.pages)
        .pipe($.changed(destination))
        .pipe($.if(isRelease, $.htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true
        })))
        .pipe(gulp.dest(destination))
        .pipe($.size({ title: 'pages' }));
});

// CSS style sheets
gulp.task('styles', function () {
    src.styles = 'src/styles/**/*.{css,less}';

    return gulp.src(['src/styles/bootstrap.less', 'node_modules/react-datetime/css/react-datetime.css', 'src/styles/myTodo.less'])
        .pipe($.plumber())
        .pipe($.less({
            sourceMap: !isRelease,
            sourceMapBasepath: __dirname
        }))
        .on('error', console.error.bind(console))
        .pipe($.if(isRelease, $.minifyCss()))
        .pipe($.concatCss('bundle.css'))
        .pipe(gulp.dest(destination + '/css'))
        .pipe($.size({title: 'styles'}));
});

// Bundle
gulp.task('bundle', function (cb) {
  var started = false;
  var config = require('./config/webpack.js')(isRelease);
  var bundler = webpack(config);

  function bundle(err, stats) {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }

    argv.verbose && $.util.log('[webpack]', stats.toString({colors: true}));

    if (!started) {
      started = true;
      return cb();
    }
  }

  if (watch) {
    bundler.watch(200, bundle);
  } else {
    bundler.run(bundle);
  }
});

// Build the app from source code
gulp.task('build', ['clean'], function (cb) {
    runSequence(['fonts', 'assets', 'pages', 'styles', 'bundle'], cb);
});

// Launch a lightweight HTTP Server
gulp.task('serve', function (cb) {

  watch = true;

  runSequence('build', function () {
    browserSync({
      notify: false,
      // Customize the BrowserSync console logging prefix
      logPrefix: 'RSK',
      // Run as an https by uncommenting 'https: true'
      // Note: this uses an unsigned certificate which on first access
      //       will present a certificate warning in the browser.
      // https: true,
      server: destination
    });

    gulp.watch(src.assets, ['assets']);
    gulp.watch(src.pages, ['pages']);
    gulp.watch(src.styles, ['styles']);
    gulp.watch(destination + '/**/*.*', function (file) {
      browserSync.reload(path.relative(__dirname, file.path));
    });
    cb();
  });
});