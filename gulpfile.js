var gulp = require('gulp');

var autoprefixer = require('gulp-autoprefixer');
var sass         = require('gulp-sass');
var concat       = require('gulp-concat');
var streamqueue  = require('streamqueue');
var concatCss    = require('gulp-concat-css');

var paths = {
  src: {
    js: ['js/**/*', 'node_modules/ng-file-upload/dist/ng-file-upload.js', 'lib/**/*'],
    dialog: ['node_modules/ng-dialog/**/*'],
    scss: ['css/*.scss'],
    index: 'index.html',
    partials: 'partials/**/*',
    assets: ['assets/**/*', "node_modules/angular/angular.js", 'node_modules/firebase/lib/firebase-web.js', 'node_modules/angularfire/dist/angularfire.js']
  },
  dest: {
    dialog: 'app/assets/ng-dialog',
    js: 'index.js',
    partials: 'app/partials/',
    assets: 'app/assets',
    css: 'index.css',
    dir: 'app/'

  }
}

gulp.task('default', ['sass', 'assets', 'js', 'dialog', 'watch']);

gulp.task('sass', function () {
  gulp.src(paths.src.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(concatCss(paths.dest.css))
    .pipe(gulp.dest(paths.dest.dir));
});

gulp.task('assets', function() {
  gulp.src(paths.src.index)
    .pipe(gulp.dest(paths.dest.dir))
  gulp.src(paths.src.partials)
    .pipe(gulp.dest(paths.dest.partials))
  gulp.src(paths.src.assets)
    .pipe(gulp.dest(paths.dest.assets))
})

gulp.task('dialog', function() {
  gulp.src(paths.src.dialog)
    .pipe(gulp.dest(paths.dest.dialog))
})

gulp.task('js', function() {
  streamqueue(
    { objectMode: true },
    gulp.src(paths.src.js)
  )
    //.pipe(uglify())
    .pipe(concat(paths.dest.js))
    .pipe(gulp.dest(paths.dest.dir))
});

gulp.task('watch', function(){
  gulp.watch(paths.src.scss, ['sass']);
  gulp.watch(paths.src.js, ['js']);
  gulp.watch(paths.src.assets, ['assets']);
  gulp.watch(paths.src.index, ['assets']);
  gulp.watch(paths.src.partials, ['assets']);
});
