var gulp = require('gulp'),
    jspm = require('gulp-jspm'),
    rename = require('gulp-rename'),
    compodoc= require('@compodoc/gulp-compodoc');

var ts = require("gulp-typescript");

var ts = require("gulp-typescript");

gulp.task('watch',['bundle-content','copy-styles'],function() {
    gulp.watch('./src/translator/mtw.js', ['bundle-content']);
    gulp.watch('./src/assets/styles/MTWStyles.css', ['copy-styles']);
});

gulp.task('copy-styles', function() {
  return gulp.src('./src/assets/styles/MTWStyles.css')
    .pipe(rename('MTWStyles.css'))
    .pipe(gulp.dest('./www/assets/styles/'));
});


gulp.task('bundle-content', function() {
  return gulp.src('./src/translator/mtw.js')
    .pipe(jspm({
      selfExecutingBundle: true
    }))
    .pipe(rename('mtw.js'))
    .pipe(gulp.dest('./www/build/'));
});

gulp.task('docs', () => {
  return gulp.src('src/**/*.ts')
    .pipe(compodoc({
            output: 'docs',
            tsconfig: 'tsconfig.json',
            serve: true,
            watch: true
        }))
});


gulp.run('watch'); 