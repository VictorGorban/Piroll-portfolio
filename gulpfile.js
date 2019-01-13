var gulp = require('gulp');
var sass = require('gulp-sass');
//var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

var pathToSassFiles = "assets/styles/sass/**/*.scss";
var pathToCss = "assets/styles/css";
var pathToCssFiles  = "assets/styles/css/**/*.css";

// // отдельно не нужно
// gulp.task('sync.init', function(){
//     browserSync.init({
//         server: {
//             baseDir: "."
//         }
//     });
// });

// работает
gulp.task('sass', function() {
    return gulp.src(pathToSassFiles) // Берем источник. Один файл?
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest(pathToCss)); // Выгружаем результата в папку app/css
});

// работает. Только Storm не сразу обновляет директорию.
gulp.task('sass.watch', ['sass'], function(){
    gulp.watch(pathToSassFiles, ['sass']);
});
gulp.task('sass-watch', function(){
    gulp.start('sass.watch');
});
gulp.task('watch-sass', function(){
    gulp.start('sass.watch');
});

// работает как надо
gulp.task('sync', function(){
    // init нужен, чтобы обновление работало. Без интерпретатор не видит, к какому объекту применять функцию.
    browserSync.init({ 
        server: ".",
        index: "contact.html"
    });
    gulp.watch(pathToCssFiles, browserSync.reload);
    gulp.watch("./*.html", browserSync.reload);
});
