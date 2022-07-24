const gulp = require('gulp')

const gulpDartSass = require('gulp-dart-sass');

const gulpPostcss = require('gulp-postcss');

const postcssReporter = require('postcss-reporter');

const gulpPlumber = require('gulp-plumber');

const srcPath = {
    root: 'src',
    scss: 'src/scss/**/*.scss',
}

const destPath = {
    root: 'dist',
}

const scssCompile = (done) => {
    gulp.src(srcPath.scss)
    .pipe(gulpPlumber())
    .pipe(gulpDartSass({
    outputStyle: 'expanded'
    }))
    .pipe(gulpPostcss([
    postcssReporter({
    clearMessages: true,
    }),
    ]))
    .pipe(gulp.dest(destPath.root));
    done();
    };

const watch = (docs) => {
    gulp.watch(srcPath.scss, gulp.parallel(scssCompile));
    docs();
};

exports.start = gulp.series(scssCompile, watch);