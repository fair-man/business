'use strict';

module.exports = function(grunt) {

    var globalConfig = {
        images : 'images',        /* папка для картинок сайта */
        styles : 'css',           /* папка для готовый файлов less стилей */
        fonts : 'fonts',          /* папка для шрифтов */
        scripts : 'js',           /* папка для готовых скриптов js */
        src : 'app',              /* папка с исходными кодами js, less , etc. */
        dist : 'dist',            /* папка для продакшен*/
        bower_path : 'libraries' /* папка где хранятся библиотеки jquery, bootstrap, SyntaxHighlighter, etc. */
    };

    grunt.initConfig({
        globalConfig : globalConfig,
        pkg : grunt.file.readJSON('package.json'),

        copy : {
            fonts: {
                files : [{
                    expand : true,
                    flatten : true,
                    src : '<%= globalConfig.src %>/fonts/*.{eot,svg,ttf,woff}',
                    dest : '<%= globalConfig.dist %>/fonts',
                    filter : 'isFile'
                }]
            },
            main : {
                files : [{
                    expand : true,
                    flatten : true,
                    src : '<%= globalConfig.bower_path %>/jquery/dist/jquery.min.js',
                    dest : '<%= globalConfig.dist %>/js',
                    filter : 'isFile'
                }, {
                    expand : true,
                    flatten : true,
                    src : '<%= globalConfig.bower_path %>/html5shiv/dist/html5shiv.min.js',
                    dest : '<%= globalConfig.dist %>/js',
                    filter : 'isFile'
                }, {
                    expand : true,
                    flatten : true,
                    src : '<%= globalConfig.bower_path %>/bootstrap/dist/js/bootstrap.min.js',
                    dest : '<%= globalConfig.dist %>/js',
                    filter : 'isFile'
                }, {
                    expand : true,
                    flatten : true,
                    src : '<%= globalConfig.bower_path %>/bootstrap/fonts/*',
                    dest : '<%= globalConfig.dist %>/fonts',
                    filter : 'isFile'
                },
                    {
                    expand : true,
                    cwd: '<%= globalConfig.bower_path %>/bootstrap/less/',
                    src : ['**'],
                    dest : '<%= globalConfig.src %>/less/bootstrap/'
                },
                    {
                    expand : true,
                    flatten : true,
                    src : '<%= globalConfig.bower_path %>/respond/dest/respond.min.js',
                    dest : '<%= globalConfig.dist %>/js',
                    filter : 'isFile'
                }
                ]
            }
        },
        mkdir: {
             all: {
                 options: {
                     create: [
                         '<%= globalConfig.src %>/fonts', /*папка со шрифтами*/
                         '<%= globalConfig.src %>/images', /*папка с картинками*/
                         '<%= globalConfig.src %>/js', /*папка с javascript*/
                         '<%= globalConfig.src %>/tmp', /*папка с временных файлов*/
                         '<%= globalConfig.src %>/sprite' /*папка для картинок спрайта*/
                     ]
                 }
             }
        },
        clean : {
            js : ['<%= globalConfig.src %>/js/app.js', '<%= globalConfig.dist %>/js/app.min.js'],
            css : ['<%= globalConfig.src %>/less/styles.css', '<%= globalConfig.dist %>/css/style.min.css']
        },
        jade: {
            compile: {
                options: {
                    pretty: true
                },
                files: {
                    'dist/index.html': 'app/block/layouts/base.jade'
                }
            }
        },
        sprite:{
            all: {
                padding: 2,
                src: '<%= globalConfig.src %>/sprite/*.png',
                dest: '<%= globalConfig.src %>/images/sprites/spritesheet.png',
                destCss: '<%= globalConfig.src %>/less/sprite.less'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '<%= globalConfig.src %>/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= globalConfig.dist %>/images'
                }]
            }
        },
        less : {
            compile: {
                files: [{
                    cwd: '<%= globalConfig.src %>/less',
                    src: '*.less',
                    dest: '<%= globalConfig.src %>/less',
                    expand: true,
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            production: {
                files: {
                    '<%= globalConfig.dist %>/css/app.min.css': '<%= globalConfig.src %>/less/*.css'
                }
            }
        },
        concat : {
            dev: {
                files: {
                    '<%= globalConfig.src %>/js/app.js': '<%= globalConfig.src %>/js/*.js'
                },
                options : {
                    banner : ";(function( window, undefined ){ \n 'use strict'; \n",
                    footer : "\n}( window ));"
                }
            }
        },
        uglify: {
            production: {
                files: {
                    '<%= globalConfig.dist %>/js/app.min.js': '<%= globalConfig.src %>/js/app.js'
                }
            }
        },
        watch : {
            livereload: {
                options: {
                    livereload: true
                },
                files: ['<%= globalConfig.src %>/**/*']
            },
            less: {
                files : ['<%= globalConfig.src %>/less/**/*.less'],
                tasks : ['css_compile']
            },
            js: {
                files : ['<%= globalConfig.src %>/js/*.js'],
                tasks : ['js_compile']
            },
            jade: {
                files: ['<%= globalConfig.src %>/block/**/*.jade'],
                tasks: ['jade_compile']
            }
        },
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: '<%= globalConfig.dist %>',
                    open: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // 1. Default task(s).
    grunt.registerTask('default', ['copy:main', 'mkdir']);
    grunt.registerTask('basis', ['copy:fonts' ,'jade_compile', 'css_compile', 'js_compile']);
    grunt.registerTask('sprite');
    grunt.registerTask('image', ['imagemin']);

    // Working task(s).
    grunt.registerTask('jade_compile', ['jade']);
    grunt.registerTask('css_compile', ['clean:css', 'less', 'cssmin']);
    grunt.registerTask('js_compile', ['clean:js', 'concat', 'uglify']);

    // 2. Use for development
    grunt.registerTask('work', ['connect', 'watch']);
};
