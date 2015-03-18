var path = require("path");

module.exports = function (grunt) {
    "use strict";

    var paths = {
        main: 'public/app/main/',
        admin: 'public/app/admin/',
        common: 'public/app/',
        utils: 'public/app/utils/'
    };

    var prodBuildFolder = 'public/sources/';

    var LIVERELOAD_PORT = 35729;

    var lrSnippet = require('connect-livereload')({
        port: LIVERELOAD_PORT
    });
    var mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dev:{
                src: [
                    paths.admin + '*.js',
                    paths.admin + '*.js.map',

                    paths.main + '*.js',
                    paths.main + '*.js.map',

                    paths.common + '*.js',
                    paths.common + '*.js.map',

                    paths.utils + '*.js',
                    paths.utils + '*.js.map',

                    'built_views/*',

                    '!' + paths.utils + 'custom-bindings.js',
                    '!' + paths.admin + 'config.js'
                ]
            },
            prod: [prodBuildFolder + "*", 'built_views/*']
        },

        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %>.<%= pkg.version %> built on <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            prod: {
                files: [{
                    expand: true,
                    cwd: 'public/stylesheets',
                    src: ['*.css', '!*.min.css'],
                    dest: prodBuildFolder + 'css',
                    ext: '.min.css'
                }]
            }
        },

        ts: {
            dev: {
                src: [
                    'public/app/*.ts',

                    paths.admin + '*.ts',
                    paths.admin + '**/*.ts',

                    paths.main + '*.ts',
                    paths.main + '**/*.ts',

                    paths.utils + '*.ts',
                ]
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> madalinplastoi \n' +
                '* Available via the MIT license.\n' +
                '* see: http://opensource.org/licenses/MIT for blueprint.\n' +
                '*/\n'
            },
            main: {
                src: [paths.main + '*.js', paths.main + '**/*.js'],
                dest: prodBuildFolder + 'js/main.min.js'
            },
            common: {
                src: [paths.common + '*.js'],
                dest: prodBuildFolder + 'js/common.min.js'
            },
            utils: {
                src: [paths.utils + '*.js', paths.utils + '**/*.js'],
                dest: prodBuildFolder + 'js/utils.min.js'
            }
        },

        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'views/',
                    src: ['**/*'],
                    dest: 'built_views/'
                },
                    {
                        expand: true,
                        cwd: 'dal/entity/',
                        src: ['Domain.js'],
                        dest: 'public/app'
                    }
                ]
            },
            prod: {
                files: [{
                    expand: true,
                    cwd: 'dal/entity/',
                    src: ['Domain.js'],
                    dest: 'public/app'
                }]
            }
        },

        processhtml: {
            options: {
                data: {
                    message: 'Hello world!'
                }
            },
            dist: {
                files: [
                    {'built_views/main/index.ejs': ['views/main/index.ejs']},
                    {'built_views/admin/index.ejs': ['views/admin/index.ejs']},
                    {'built_views/admin/login.ejs': ['views/admin/login.ejs']}]
            }
        },

        watch: {
            dev: {
                files: [
                    'public/app/*.ts',
                    paths.main + '*.ts',
                    paths.main + '**/*.ts',
                    paths.admin + '*.ts',
                    paths.admin + '**/*.ts',
                    paths.utils + '*.ts',

                    'views/*.ejs',
                    'views/**/*.ejs',
                    'dal/entity/Domain.js'
                ],
                tasks: ['build', 'copy:dev'],
                options: {
                    livereload: true
                }
            },
            prod: {
                files: [
                    'views/*.ejs',
                    'views/**/*.ejs',
                    'dal/entity/Domain.js'
                ],
                tasks: ['processhtml', 'copy:prod'],
                options: {
                    livereload: true
                }
            }
        },

        express: {
            options: {
                port: 8000,
                hostname: '*'
            },
            dev: {
                options: {
                    server: path.resolve('./app.js'),
                    livereload: true,
                    serverreload: true,
                    bases: [path.resolve('./public')]
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-processhtml');

    grunt.registerTask("build", ['clean', 'ts']);
    grunt.registerTask("dev", ['build', 'copy:dev', 'watch:dev']);
    grunt.registerTask("prod", ['build', 'processhtml', 'copy:prod', 'uglify', 'cssmin', 'watch:prod']);
};
