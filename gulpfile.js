const gulp = require('gulp');
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

const minifyCSS = require("gulp-minify-css");
const replace = require("gulp-html-replace");
const sourcemap = require("gulp-sourcemaps");

const imagemin = require('gulp-imagemin');
const imageresize = require('gulp-image-resize');

const htmlmin = require('gulp-htmlmin');

const jsmin = require('gulp-jsmin');
const rename = require('gulp-rename');

gulp.task('content', function() {
	gulp.src('./src/**/*.html')
		.pipe(htmlmin({collapseWhitespace: false}))
		.pipe(gulp.dest('./dist/'))
		.pipe(reload({stream: true}))
});

gulp.task('scripts', function() {
	gulp.src('./src/**/*.js')
		// uncomment the next line to map js files
		//.pipe(sourcemap.init({loadMaps: true}))
		.pipe(jsmin())
		.pipe(rename({suffix: '.min'}))
		// uncomment the next line to map js files
		//.pipe(sourcemap.write())
		.pipe(gulp.dest('./dist'))
		.pipe(reload({stream: true}))
});

gulp.task('styles', function() {
	gulp.src('src/**/*.css')
		.pipe(minifyCSS())
		.pipe(gulp.dest('./dist'))
		.pipe(reload({stream: true}))
});

gulp.task('images', function() {
    gulp.src(['src/**/*.png','src/**/*.jpg','src/**/*.gif','src/**/*.jpeg'])
    	.pipe(imagemin({
	    		progressive: true
    		}))
    	.pipe(imageresize({
	    		width: 115,
	    		upscale : false
    		}))
    	.pipe(gulp.dest('dist'));
});

gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: './dist/'
		}
	});
	gulp.watch('./src/index.html', ['content']);
	gulp.watch('./src/js/*.js', ['scripts']);
	gulp.watch('./src/css/*.css', ['styles']);
});

gulp.task('default', ['images', 'content', 'scripts', 'styles', 'serve']);