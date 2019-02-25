// Required gulp dev dependencies
const gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const del = require('del');
const img = require('gulp-image');
const server = require('gulp-webserver');

// gulp scripts to generate source map, concatenate, and minify to dist/scripts folder
gulp.task('scripts', () => {
    return gulp.src([
        'js/global.js',
        'js/circle/autogrow.js',
        'js/circle/circle.js'
    ])
    .pipe(maps.init())
    .pipe(concat('all.min.js'))
    .pipe(minify())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/scripts'));
});

// gulp styles to generate source map, concatenate, and minify to dist/styles folder
gulp.task('styles', () => {
    return gulp.src('sass/global.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(rename('all.min.css'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/styles'));
});

// gulp images to reduce file size of images and copy into dist/content folder
gulp.task('images', () => {
    return gulp.src('images/*')
    .pipe(img())
    .pipe(gulp.dest('dist/content'));
});

// watch for changes to any .scss file and run gulp styles when a change is detected to cimpile, concatenate, and minify to dist folder
gulp.task('watchSass', () => {
    gulp.watch('sass/*.scss', ['styles']);
});

gulp.task('html', () => {
    return gulp.src("index.html")
    .pipe(gulp.dest('dist/'));
});

// delete all of the files and folders in the dist folder
gulp.task('clean', () => {
    return del(['dist/']);
});

gulp.task("build", ['clean', 'scripts', 'styles', 'images', 'html']);

// watch start local server on port 3000
gulp.task('serve', ['watchSass'], () => {
    return gulp.src('./')
        .pipe(server({
            port: 3000,
            livereload: true,
            open: 'http://localhost:3000'
        }));
});

// default gulp setings
gulp.task("default", ['build'], () => {
    gulp.start('serve');
});