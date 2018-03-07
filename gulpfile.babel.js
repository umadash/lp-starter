'use strict';

const gulp = require("gulp");
const watch = require('gulp-watch');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const pleeease = require('gulp-pleeease');
const browserSync = require('browser-sync');
const readConfig = require('read-config');
const source = require('vinyl-source-stream');
const runSequence = require("run-sequence");

const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");


// 定数
const SRC = './_src';
const CONFIG = './_src/config';
const PUBLIC = './public';
const BASE_PATH = '';
const DEST = `${PUBLIC}${BASE_PATH}`;

// html
gulp.task('pug', () => {
  const locals = readConfig(`${CONFIG}/meta.yml`);
  return gulp.src(`${SRC}/pug/**/[!_]*.pug`)
    .pipe(pug({
      locals: locals,
      pretty: true,
      basedir: `${SRC}/pug`
    }))
    .pipe(gulp.dest(`${DEST}`));
});
gulp.task('html', ['pug']);

// css
gulp.task('sass', () => {
  const config = readConfig(`${CONFIG}/pleeease.json`);
  return gulp.src(`${SRC}/scss/style.scss`)
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(pleeease(config))
    .pipe(gulp.dest(`${DEST}/css`))
});
gulp.task('css', ['sass']);

// js
gulp.task('js', () => {
  return webpackStream(webpackConfig, webpack).pipe(gulp.dest('public/js'));
});

// browser-sync
gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: PUBLIC
    },
    startPath: ``,
  });
  watch([
    `${SRC}/pug/**/*.pug`,
  ], ['pug', browserSync.reload]);
  watch([`${SRC}/scss/**/*.scss`], ['sass', browserSync.reload]);
  watch([`${SRC}/js/**/*.js`], ['js', browserSync.reload]);
});
gulp.task('serve', ['browser-sync']);


// default
gulp.task('build', runSequence('html', 'css', 'js'));
gulp.task('default', runSequence('build', 'serve'));