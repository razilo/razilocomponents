var gulp = require('gulp');
var rename = require("gulp-rename");
var util = require('gulp-util');
var vulcanize = require('gulp-vulcanize');

/**************************************************/
/* Build into distributable, development versions */
/**************************************************/

gulp.task('build', ['build-full-vulc']);

gulp.task('build-full-vulc', function () {
    return gulp.src('./index.html')
        .pipe(vulcanize({
            csp: false
        }))
		.pipe(rename('index.vulc.html'))
        .pipe(gulp.dest('./build/'));
});
