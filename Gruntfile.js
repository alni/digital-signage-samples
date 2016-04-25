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
                    cwd: '<%= dir.src %>/xibo/forecast',
                    src: [ // Xibo Modules files
                        '*.json',
                    ],
                    dest: '<%= dir.dist %>/xibo/xibo-cms/modules/theme/forecastio/'
                }, {
                    expand: true,
                    cwd: '<%= dir.src %>/xibo/ticker',
                    src: [ // Xibo Modules files
                        '*.json',
                    ],
                    dest: '<%= dir.dist %>/xibo/xibo-cms/modules/theme/ticker/'
                }, {
                    expand: true,
                    cwd: '<%= dir.src %>/xibo/twitter',
                    src: [ // Xibo Modules files
                        '*.json',
                    ],
                    dest: '<%= dir.dist %>/xibo/xibo-cms/modules/theme/twitter/'
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
                        //'ticker/*.json',

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
        },
        
        xibo: {
            forecast: {
                "cwd": "<%= dir.src %>/xibo/forecast/",
                files: [{
                    "template": "custom-current",
                    "main": "current.html",
                    "css": "current.min.css"
                }, {
                    "template": "custom-5-day",
                    "main": "5days_main.html",
                    "daily": "5days_dailyForecast.html",
                    "css": "5days.min.css"
                }]
            },
            ticker: {
                "cwd": "<%= dir.src %>/xibo/ticker/",
                files: [{
                    "template": "custom-media-rss-with-title-flickr",
                    "html": "media-rss-with-title/flickr.html",
                    "css": "media-rss-with-title/flickr.min.css"
                }, {
                    "template": "custom-media-rss-with-title-flickr2",
                    "html": "media-rss-with-title/flickr2.html",
                    "css": "media-rss-with-title/flickr.min.css"
                }, {
                    "template": "custom-media-rss-with-title-width-desc",
                    "html": "media-rss-with-title/with_desc.html",
                    "css": "media-rss-with-title/with_desc.min.css"
                }, {
                    "template": "custom-title-only-with-logo",
                    "html": "title-only/with_logo.html",
                    "css": "title-only/with_logo.min.css"
                }, {
                    "template": "custom-title-only-with-name",
                    "html": "title-only/with_name.html",
                    "css": "title-only/with_name.min.css"
                }]
            },
            twitter: {
                "cwd": "<%= dir.src %>/xibo/twitter/",
                files: [{
                    "template": "custom-tweet-with-profileimage-left-marqueeLeft",
                    "html": "tweet-with-profileimage-left/marqueeLeft.html",
                    "css": "tweet-with-profileimage-left/marqueeLeft.min.css"
                }]
            }
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Build task
    grunt.registerTask('build', ['xibo', 'copy']);

    grunt.registerMultiTask('xibo', 'Build Xibo module templates to JSON', function (mod) {
        var data = this.data,
            cwd = data.cwd;

        function readTemplateHtml(filePath) {
            var templateLines = [];
            var htmlTemplate = grunt.file.read(filePath);
            htmlTemplate = htmlTemplate.split("<!-- TEMPLATE REGION BEGIN -->").join("");
            htmlTemplate = htmlTemplate.split("<!-- /TEMPLATE REGION END -->")[0];
            htmlTemplate = htmlTemplate.split("\r").join(""); //.replace(/\s+/g, ' ');
            //templateLines = htmlTemplate.split("\n");

            return htmlTemplate;
        }
        this.data.files.forEach(function (data, index) {
            var htmlFile = data.html; // Used with regular templates
            var mainFile = data.main; // Used with Forecast templates
            var dailyFile = data.daily; // Used with Forecast templates
            var htmlContent = null;
            var mainContent = null;
            var dailyContent = null;
            var templateLines = null;
            var mainLines = null;
            var dailyLines = null;
            var cssFile = data.css;
            var jsonFile = data.template + ".template.json";
            var jsonObj;

            grunt.log.writeln(JSON.stringify(data, null, 4));
            grunt.log.writeln(cwd + htmlFile);

            if (htmlFile) {
                // Regular template
                htmlContent = readTemplateHtml(cwd + htmlFile);
                /*var htmlTemplate = grunt.file.read(cwd + htmlFile);
                htmlTemplate = htmlTemplate.substring(
                    "<!-- TEMPLATE REGION BEGIN -->".length,
                    htmlTemplate.indexOf("<!-- /TEMPLATE REGION END -->")
                );
                htmlTemplate = htmlTemplate.split("\r").join("").replace(/\s+/g, ' ');
                templateLines = htmlTemplate.split("\n");*/
            } else if (mainFile) {
                // Forecast template
                //mainLines = [].concat(readTemplateHtml(cwd + mainFile));
                mainContent = readTemplateHtml(cwd + mainFile);

                if (dailyFile) {
                    //dailyLines = [].concat(readTemplateHtml(cwd + dailyFile));
                    dailyContent = readTemplateHtml(cwd + dailyFile);
                }
            }

            var cssContent = grunt.file.read(cwd + cssFile);

            grunt.log.writeln(cwd + jsonFile);
            var jsonTemplate = grunt.file.readJSON(cwd + jsonFile);
            grunt.log.writeln(jsonTemplate);
            if (!!htmlContent) {
                // Regular template
                //jsonTemplate.template = templateLines.join("").trim();
                jsonTemplate.template = htmlContent.trim();
            } else if (!!mainContent) {
                // Forecast template
                //jsonTemplate.main = mainLines.join("").trim();
                jsonTemplate.main = mainContent.trim();

                if (!!dailyContent) {
                    //jsonTemplate.daily = dailyLines.join("").trim();
                    jsonTemplate.daily = dailyContent.trim();
                }
            }
            jsonTemplate.css = cssContent.trim();

            grunt.file.write(cwd + jsonFile, JSON.stringify(jsonTemplate, null, 4));

            
        });
    });

    // Default task
    grunt.registerTask('default', [
        'clean',
        'build',
        'connect:dist'
    ]);
};