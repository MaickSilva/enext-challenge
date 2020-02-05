// Adiciona os modulos instalados
const gulp = require('gulp');
const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const notify = require('gulp-notify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const del = require('del');

// Deletar cache
function cleanCacheCss() {
	del('./dist/css/style.css')
}

function cleanCacheJs() {
	del('./dist/js/app.js')
}


//Minificar Html 
function buildHtml() {
	return gulp.src('./src/*.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('./dist'))
	.pipe(browserSync.stream());
}
gulp.task('html', buildHtml)


//Função para compilar o SASS e adicionar os prefixos
function buildScss() {
  return gulp
  .src('./src/scss/style.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .on('error', notify.onError({title: "erro scss", message: "<%= error.message %>"}))
  .pipe(gulp.dest('./dist/css/'))
  .pipe(browserSync.stream());
}
gulp.task('sass', function(done){
	cleanCacheCss();
	buildScss();
  done();
});


// Builda o Javascript exclusivo da aplicação
function buildJs() {
  return gulp.src('./src/js/*.js')
  .pipe(concat('main.js'))
  .pipe(babel({presets: ['@babel/env'] }))
  .pipe(uglify())
  .on('error', notify.onError({title: "erro Javascript", message: "<%= error.message %>"}))
  .pipe(gulp.dest('./dist/js/'))
  .pipe(browserSync.stream());
}
gulp.task('appjs', function(done){
	cleanCacheJs();
	buildJs();
  done();
});


// Função para iniciar o browser
function browser() {
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
  })
}
// Tarefa para iniciar o browser-sync
gulp.task('browser-sync', browser);


// Função de watch do Gulp
function watch() {
  gulp.watch('./src/scss/**/*.scss', buildScss);
  gulp.watch('./src/js/**/*.js', buildJs);
  gulp.watch('./src/*.html', buildHtml);
  gulp.watch(['./src/*.html','/src/*.php', './src/**/*.php']).on('change', browserSync.reload);
  
}
// Inicia a tarefa de Watch
gulp.task('watch', watch);

//Tarefa padrão do Gulp, que inicia o Watch e o Browser-sync // Aqui são os nomes que ficam nas tarefas
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'appjs' , 'html')); 


/* Como utilizar 
1 - $ npm install
2 - $ gulp

*/