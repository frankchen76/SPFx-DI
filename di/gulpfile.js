var rimraf = require('rimraf');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');



gulp.task('build', function () {
    var tsProject = ts.createProject('./tsconfig.json');
    return tsProject.src() // or tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: './'
        }))
        .pipe(gulp.dest('./lib'));

    //return tsResult.js.pipe(gulp.dest('./lib'));
    //return tsResult.pipe(gulp.dest('./lib'));

});

gulp.task('clean', function (cb) {
    //rimraf('./lib', { read: false });
    rimraf('./lib', cb);
});

gulp.task('default', gulp.series('clean', 'build'));