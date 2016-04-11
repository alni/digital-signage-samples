/// <binding BeforeBuild='clean, build' />
'use strict';

module.exports = function (grunt) {

    grunt.initConfig({

        dir: {
            src: '.',
            dist: 'dist'
        },

        connect: {
            options: {
                port: 8080,
                hostname: '*'
            },
            dist: {
                options: {
                    keepalive: true,
                    port: 8080,
                    base: '<%= dir.dist %>'
                }
            }
        },



        clean: {
            dist: {
                files: [
                    // Delete all files (_only_ files)
                    {
                        src: [
                            '<%= dir.dist %>/**',
                            '!<%= dir.dist %>/keepme.txt'
                        ],
                        filter: 'isFile'
                    },
                ]
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= dir.src %>',
                    src: [ // Web Server files
                        // Coin Slider:
                        'coin-slider/coin-slider/*.css',
                        'coin-slider/coin-slider/*.json',
                        'coin-slider/coin-slider/*.js',
                        'coin-slider/coin-slider/*.html',
                        'coin-slider/coin-slider/*.md',

                        'coin-slider/galleries/*.json',
                        'coin-slider/galleries/*.js',
                        'coin-slider/galleries/flickr.html',
                        'coin-slider/galleries/styles.css',
                        'coin-slider/galleries/styles.min.css',

                        'coin-slider/flickr.html',
                        'coin-slider/no-images-en.jpg',
                        'coin-slider/no-images-nb.jpg',
                        'coin-slider/styles.css',
                        'coin-slider/styles.min.css',

                        // gCalFlow:
                        'gcalflow/boards/_private/*.json',
                        'gcalflow/boards/holidays/*.json',
                        'gcalflow/boards/*.json',
                        'gcalflow/boards/index.html',
                        'gcalflow/boards/styles.css',
                        'gcalflow/boards/styles.min.css',

                        'gcalflow/jquery-gcal-flow-3.0.2/*.js',
                        'gcalflow/jquery-gcal-flow-3.0.2/*.html',
                        'gcalflow/jquery-gcal-flow-3.0.2/*.css',
                        'gcalflow/jquery-gcal-flow-3.0.2/*.asciidoc',
                        'gcalflow/jquery-gcal-flow-3.0.2/ReleaseNote',

                        'gcalflow/styles/loader.css',
                        'gcalflow/styles/loader.min.css',

                        'gcalflow/*.js',
                        'gcalflow/*.html',
                        'gcalflow/agenda.css',
                        'gcalflow/agenda.min.css',

                        // Shared:
                        'shared/lib/*.js',
                        'shared/*.js',

                        '!test/**',
                        '!**/*.vsspell'
                    ],
                    dest: '<%= dir.dist %>/www/'
                }, {
                    expand: true,
                    cwd: '<%= dir.src %>/php',
                    src: [ // Web Server files
                        'flickr/*.php',
                        '!test/**',
                        '!**/*.vsspell'
                    ],
                    dest: '<%= dir.dist %>/www/'
                }, {
                    expand: true,
                    cwd: '<%= dir.src %>/xibo',
                    src: [ // Xibo Modules files
                        'embedded/*.html',
                        'embedded/*.css',

                        'forecast/*.html',
                        'forecast/*.css',

                        'text/*.html',

                        'ticker/media-rss-with-left-hand-text/*.html',
                        'ticker/media-rss-with-left-hand-text/*.css',
                        'ticker/media-rss-with-title/*.html',
                        'ticker/media-rss-with-title/*.css',
                        'ticker/title-only/*.html',
                        'ticker/title-only/*.css',
                        'ticker/*.json',

                        'twitter/tweet-with-profileimage-left/*.html',
                        'twitter/tweet-with-profileimage-left/*.css',

                        '!test/**',
                        '!**/*.vsspell'
                    ],
                    dest: '<%= dir.dist %>/xibo/'
                }, {
                    expand: true,
                    cwd: '<%= dir.src %>',
                    src: [ // Common files
                        'LICENSE.md',
                        'README.md',
                    ],
                    dest: '<%= dir.dist %>/www/'
                }, {
                    expand: true,
                    cwd: '<%= dir.src %>',
                    src: [ // Common files
                        'LICENSE.md',
                        'README.md',
                    ],
                    dest: '<%= dir.dist %>/xibo/'
                }]
            },
        }

    });

    function readLines(input, func) {
        var remaining = '';

        input.on('data', function (data) {
            remaining += data;
            var index = remaining.indexOf('\n');
            while (index > -1) {
                var line = remaining.substring(0, index);
                remaining = remaining.substring(index + 1);
                func(line);
                index = remaining.indexOf('\n');
            }
        });
        input.on('end', function () {
            if (remaining.length > 0) {
                func(remaining);
            }
        })
    }

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Build task
    grunt.registerTask('build', ['copy']);

    grunt.registerMultiTask('xibo', 'Build Xibo module template to JSON', function (mod) {
        var fs = require('fs');
    });

    // Default task
    grunt.registerTask('default', [
        'clean',
        'build',
        'connect:dist'
    ]);
};