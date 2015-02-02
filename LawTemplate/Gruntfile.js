/**
 * Created by madalin on 1/23/2015.
 */
/*global module, require */
module.exports = function( grunt ) {
    'use strict';

    // Livereload and connect variables
    var LIVERELOAD_PORT = 35729;
    var lrSnippet = require('connect-livereload')({
        port: LIVERELOAD_PORT
    });
    var mountFolder = function( connect, dir ) {
        return connect.static(require('path').resolve(dir));
    };

    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

            clean: {
                build: ['build']
            },

            connect: {
                build: {
                    options: {
                        port: 9001,
                        hostname: 'localhost',
                        base: 'build'
                    }
                },
                dev: {
                    options: {
                        port: 8999,
                        hostname: 'localhost',
                        middleware: function( connect ) {
                            return [lrSnippet, mountFolder(connect, '.')];
                        }
                    }
                }
            },

            copy: {

                lib: {
                    src: 'lib/**',
                    dest: 'build/'
                },
                css: {
                    src: 'css/**',
                    dest: 'build/'
                },
                images: {
                    src: 'images/**',
                    dest: 'build/'
                }
            },

            open: {
                dev: {
                    path: 'http://localhost:<%= connect.dev.options.port %>'
                },
                build: {
                    path: 'http://localhost:<%= connect.build.options.port %>'
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
                build: {
                    src: ['app/*.js','app/**/*.js'],
                    dest: 'build/app/app.min.js'
                }
            },

            processhtml: {
                options: {
                    data: {
                        message: 'Hello world!'
                    }
                },
                dist: {
                    files: {
                        'build/index.html': ['index.html']
                    }
                }
            },

            watch: {
                build: {
                    files: ['build/app/*.js', 'build/app/**/*.js', 'build/index.html']
                },
                dev: {
                    files: ['app/*.js', 'build/app/**/*.js', 'index.html'],
                    options: {
                        livereload: true
                    }
                }
            }
        }
    );

// Loading plugin(s)
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-open');


    grunt.registerTask('default', ['connect:dev:livereload', 'open:dev','watch:dev']);

    grunt.registerTask('build', ['clean', 'copy', 'uglify', 'processhtml', 'connect:build', 'open:build', 'watch:build']);

    grunt.registerTask('clear', ['clean']);

};
