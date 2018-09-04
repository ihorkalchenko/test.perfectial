let gulp = require('gulp'),
		sass = require('gulp-sass'),
		cleanCss = require('gulp-clean-css'),
		uglify = require('gulp-uglify'),
		rename = require('gulp-rename'),
		rigger = require('gulp-rigger'),
		rimraf = require('rimraf'),
		imagemin = require('gulp-imagemin'),
		prefixer = require('gulp-autoprefixer'),
		browserSync = require('browser-sync'),
		reload = browserSync.reload;

let path = {
	dist: {
		html: 'dist/',
		js: 'dist/js/',
		css: 'dist/css/',
		img: 'dist/img/',
		fonts: 'dist/fonts/'
	},
	src: {
		html: 'src/*.html',
		js: 'src/js/site.js',
		style: 'src/style/site.scss',
		img: 'src/img/**/*.*/',
		fonts: 'src/fonts/**/*.*'
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		style: 'src/style/**/*.scss',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	clean: './dist'
};

let config = {
	server: {
		baseDir: './dist'
	},
	browser: ['chrome.exe'],
	host: 'localhost',
	port: 3000,
	notify: false
};

gulp.task('html', function () {
	gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.dist.html))
		.pipe(reload({stream: true}));
});

gulp.task('js', function () {
	gulp.src(path.src.js)
		.pipe(rigger())
		.pipe(gulp.dest(path.dist.js))
		.pipe(reload({stream: true}))
		// .pipe(uglify())
		// .pipe(rename({suffix: '.min'}))
		// .pipe(gulp.dest(path.dist.js))
		.pipe(reload({stream: true}));
});

gulp.task('style', function () {
	gulp.src(path.src.style)
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(prefixer({browsers: ['ie >= 9', 'last 2 version']}))
		.pipe(gulp.dest(path.dist.css))
        .pipe(reload({stream: true}))
		.pipe(cleanCss())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(path.dist.css))
		.pipe(reload({stream: true}));
});

gulp.task('image', function() {
	gulp.src(path.src.img)
		.pipe(imagemin())
		.pipe(gulp.dest(path.dist.img))
		.pipe(reload({stream: true}));
});

gulp.task('fonts', function () {
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.dist.fonts));
});

gulp.task('build', ['html', 'js', 'style', 'image', 'fonts']);

gulp.task('watch', function () {
	gulp.watch(path.watch.html, ['html']);
	gulp.watch(path.watch.js, ['js']);
	gulp.watch(path.watch.style, ['style']);
	gulp.watch(path.watch.img, ['image']);
	gulp.watch(path.watch.fonts, ['fonts']);
});

gulp.task('webserver', function () {
	browserSync(config);
});

gulp.task('clean', function (cb) {
	rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);