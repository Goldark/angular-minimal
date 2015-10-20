'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var minifyCss = require('gulp-minify-css');
var watch = require('gulp-watch');
var jasmine = require('gulp-jasmine');
var inject = require('gulp-inject');
var templateCache = require('gulp-angular-templatecache');
var connect = require('gulp-connect');

var vendorScriptFiles = require('./data/scripts-vendor.json');
var vendorStyletFiles = require('./data/styles-vendor.json');
var mainScriptFiles = require('./data/scripts-main.json');
var mainStyleFiles = require('./data/styles-main.json');
var viewFiles = require('./data/views.json');

gulp.task('vendor', function () {
  gulp
    .src('./libs/**/*')
    .pipe(gulp.dest('./dev/libs'));
});

gulp.task('vendor-dist', function () {
  gulp
    .src(vendorScriptFiles.dist)
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('./dist/scripts'));

  gulp
    .src(vendorStyletFiles.dist)
    .pipe(concat('vendor.min.css'))
    .pipe(gulp.dest('./dist/styles'));

  gulp
    .src('./libs/font-awesome/fonts/**/*')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('scripts', function () {
  gulp
    .src(mainScriptFiles)
    .pipe(gulp.dest('./dev/scripts'))
    .pipe(connect.reload());
});

gulp.task('scripts-dist', function () {
  gulp
    .src(mainScriptFiles)
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts'))
    .pipe(connect.reload());
});

gulp.task('styles', function () {
   gulp
    .src(mainStyleFiles)
    .pipe(gulp.dest('./dev/styles'))
    .pipe(connect.reload());
});

gulp.task('styles-dist', function () {
   gulp
    .src(mainStyleFiles)
    .pipe(concat('main.min.css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/styles'))
    .pipe(connect.reload());
});

gulp.task('assets', function () {
  gulp
    .src(['./src/assets/**/*'])
    .pipe(gulp.dest('./dev/assets'))
    .pipe(connect.reload());
});

gulp.task('assets-dist', function () {
  gulp
    .src(['./src/assets/**/*'])
    .pipe(gulp.dest('./dist/assets'))
    .pipe(connect.reload());
});

gulp.task('partials', function () {
  gulp
    .src(viewFiles)
    .pipe(templateCache({
      module: 'app',
      transformUrl: function (url) {
        return 'partials/' + url;
      }
    }))
    .pipe(gulp.dest('./dev/scripts'))
    .pipe(connect.reload());
});

gulp.task('partials-dist', function () {
  gulp
    .src(viewFiles)
    .pipe(templateCache({
      module: 'app',
      transformUrl: function (url) {
        return 'partials/' + url;
      }
    }))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts'))
    .pipe(connect.reload());
});

gulp.task('inject', function () {
  var srcConfig = {
    read: false
  };
  var injectConfig = {
    addRootSlash: false,
    transform: function (path) {
      var _path = path.replace(/^src\//, '');
      if (path.indexOf('.js') !== -1) {
        return '<script src="' + _path + '"></script>';
      }
      if (path.indexOf('.css') !== -1) {
        return '<link rel="stylesheet" href="' + _path + '">';
      }
      return _path;
    }
  };
  var injectJSFiles = vendorScriptFiles.dev.concat(mainScriptFiles);
  var injectCSSFiles = vendorStyletFiles.dev.concat(mainStyleFiles);
  gulp
    .src('./src/index.html')
    .pipe(inject(gulp.src(injectJSFiles, srcConfig), injectConfig))
    .pipe(inject(gulp.src(injectCSSFiles, srcConfig), injectConfig))
    .pipe(gulp.dest('./dev'));
});

gulp.task('inject-dist', function () {
  var srcConfig = {
    read: false
  };
  var injectConfig = {
    addRootSlash: false,
    transform: function (path) {
      var _path = path.replace(/^dist\//, '');
      if (path.indexOf('.js') !== -1) {
        return '<script src="' + _path + '"></script>';
      }
      if (path.indexOf('.css') !== -1) {
        return '<link rel="stylesheet" href="' + _path + '">';
      }
      return _path;
    }
  };
  var injectJSFiles = ['./dist/scripts/vendor.min.js', './dist/scripts/main.min.js', './dist/scripts/templates.js'];
  var injectCSSFiles = ['./dist/styles/vendor.min.css', './dist/styles/main.min.css'];
  gulp
    .src('./src/index.html')
    .pipe(inject(gulp.src(injectJSFiles, srcConfig), injectConfig))
    .pipe(inject(gulp.src(injectCSSFiles, srcConfig), injectConfig))
    .pipe(gulp.dest('./dist'));
});

gulp.task('connect', function () {
  connect.server({
    root: ['./dev'],
    livereload: true
  });
});

gulp.task('connect-dist', function () {
  connect.server({
    root: ['./dist'],
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch(mainScriptFiles, ['scripts']);
  gulp.watch(mainStyleFiles, ['styles']);
  gulp.watch(viewFiles, ['partials']);
  gulp.watch('./src/assets/**/*', ['assets']);
});

gulp.task('watch-dist', function () {
  gulp.watch(mainScriptFiles, ['scripts-dist']);
  gulp.watch(mainStyleFiles, ['styles-dist']);
  gulp.watch(viewFiles, ['partials-dist']);
  gulp.watch('./src/assets/**/*', ['assets-dist']);
});

gulp.task('test', function () {
  gulp.src('spec/test.js')
    .pipe(jasmine());
});

gulp.task('dev', ['vendor', 'scripts', 'styles', 'partials', 'assets', 'inject', 'connect', 'watch']);
gulp.task('dist', ['vendor-dist', 'scripts-dist', 'styles-dist', 'partials-dist', 'assets-dist', 'inject-dist', 'connect-dist', 'watch-dist']);
