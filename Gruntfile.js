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
            },
            src: {
                options: {
                    keepalive: true,
                    port: 50353,
                    base: '<%= dir.src %>'
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

        //copy: {
        sync: {
            dist: {
                verbose: true, // Default: false 
                compareUsing: "md5", /* compares via md5 hash of file contents, 
                                        instead of file modification time. 
                                        Default: "mtime" */
                files: [{
                    expand: true,
                    cwd: '<%= dir.src %>',
                    src: [ // Web Server files
                        // CSS3 Digital Clock:
                        'css3-digital-clock/*.html',
                        'css3-digital-clock/*.css',

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
                        'gcalflow/boards/_private/**/*.json',
                        'gcalflow/boards/holidays/**/*.json',
                        'gcalflow/boards//**/*.json',
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

                        // Responsive Tabbed Navigation:
                        'responsive-tabbed-navigation/config/**/*.json',

                        'responsive-tabbed-navigation/css/*.css',

                        'responsive-tabbed-navigation/img/*.pdf',
                        'responsive-tabbed-navigation/img/*.svg',

                        'responsive-tabbed-navigation/js/*.js',

                        'responsive-tabbed-navigation/index.html',
                        'responsive-tabbed-navigation/styles.css',
                        'responsive-tabbed-navigation/styles.min.css',

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

                        'forecast/*.php',
                        'forecast/*.js',
                        'forecast/styles.min.css',
                        'forecast/styles.css',
                        'forecast/weather_icons/*.css',
                        'forecast/weather_icons/*.eot',
                        'forecast/weather_icons/*.otf',
                        'forecast/weather_icons/*.png',
                        'forecast/weather_icons/*.svg',
                        'forecast/weather_icons/*.ttf',
                        'forecast/weather_icons/*.woff',

                        'forecast/weather-icons-2.0.10/css/*.css',
                        'forecast/weather-icons-2.0.10/font/*.eot',
                        'forecast/weather-icons-2.0.10/font/*.otf',
                        'forecast/weather-icons-2.0.10/font/*.svg',
                        'forecast/weather-icons-2.0.10/font/*.ttf',
                        'forecast/weather-icons-2.0.10/font/*.woff',
                        'forecast/weather-icons-2.0.10/font/*.woff2',
                        'forecast/weather-icons-2.0.10/bower.json',
                        'forecast/weather-icons-2.0.10/README.md',

                        'rss2gcal/*.php',

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
                }, {
                    expand: true,
                    cwd: '<%= dir.src %>/gapps-script',
                    src: [ // Google Apps Script files
                        // Calendar Task List:
                        'calendar-task-list/Code.gs.js',
                        'calendar-task-list/tasks.html',
                        'calendar-task-list/*.md',

                        // Pollenvarsling
                        'pollenvarsling/Code.gs.js',
                        'pollenvarsling/*.md'
                    ],
                    dest: '<%= dir.dist %>/gapps-script/'
                }/*, {
                    cwd: '<%= dir.src %>',
                    src: "shared/lib/moment-with-locales.min.js",
                    dest: "<%= dir.dist %>/gapps-script/calendar-task-list/MomentJS.gs.js"
                }*/, {
                    expand: true,
                    cwd: '<%= dir.src %>/domoticz',
                    src: [ // Domoticz files
                        // On/Off Actions:
                        'actions/*.ahk',
                        'actions/*.bat',

                        // Lua Event Scripts:
                        'lua/*.lua',
                        // Temperature Alert:
                        'lua/temperature-alert/main.lua',
                        'lua/temperature-alert/*.md',
                    ],
                    dest: '<%= dir.dist %>/domoticz/'
                }]
            },
        },

        copy: {
            dist: {
                files: [{
                    cwd: '<%= dir.src %>',
                    src: "shared/lib/moment-with-locales.min.js",
                    dest: "<%= dir.dist %>/gapps-script/calendar-task-list/MomentJS.gs.js"
                }]
            }
        },

        less: {
            development: {
                options: {

                },
                files: {
                    // Coin Slider:
                    'coin-slider/styles.css': 'coin-slider/styles.less',
                    'coin-slider/galleries/styles.css': 'coin-slider/galleries/styles.less',

                    // CSS3 Digital Clock:
                    'css3-digital-clock/styles.css': 'css3-digital-clock/styles.less',

                    // gCalFlow:
                    'gcalflow/agenda.css': 'gcalflow/agenda.less',
                    'gcalflow/boards/styles.css': 'gcalflow/boards/styles.less',
                    'gcalflow/styles/loader.css': 'gcalflow/styles/loader.less',

                    // PHP Forecast:
                    'php/forecast/styles.css': 'php/forecast/styles.less',

                    // Responsive Tabbed Navigation:
                    'responsive-tabbed-navigation/styles.css': 'responsive-tabbed-navigation/styles.less',


                    // Xibo Modules files
                    'xibo/embedded/header.css': 'xibo/embedded/header.less',
                    'xibo/embedded/youtube.css': 'xibo/embedded/youtube.less',

                    'xibo/forecast/5days.css': 'xibo/forecast/5days.less',
                    'xibo/forecast/current.css': 'xibo/forecast/current.less',
                    'xibo/forecast/table/table.css': 'xibo/forecast/table/table.less',

                    'xibo/ticker/media-rss-with-left-hand-text/full_width.css': 'xibo/ticker/media-rss-with-left-hand-text/full_width.less',
                    'xibo/ticker/media-rss-with-title/flickr.css': 'xibo/ticker/media-rss-with-title/flickr.less',
                    'xibo/ticker/media-rss-with-title/with_desc.css': 'xibo/ticker/media-rss-with-title/with_desc.less',
                    'xibo/ticker/title-only/with_logo.css': 'xibo/ticker/title-only/with_logo.less',
                    'xibo/ticker/title-only/with_name.css': 'xibo/ticker/title-only/with_name.less',

                    'xibo/twitter/tweet-with-profileimage-left/marqueeLeft.css': 'xibo/twitter/tweet-with-profileimage-left/marqueeLeft.less',
                }
            },
        },

        cssmin: {
            target: {
                files: {
                    // Coin Slider:
                    'coin-slider/styles.min.css': 'coin-slider/styles.css',
                    'coin-slider/galleries/styles.min.css': 'coin-slider/galleries/styles.css',

                    // CSS3 Digital Clock:
                    'css3-digital-clock/styles.min.css': 'css3-digital-clock/styles.css',

                    // gCalFlow:
                    'gcalflow/agenda.min.css': 'gcalflow/agenda.css',
                    'gcalflow/boards/styles.min.css': 'gcalflow/boards/styles.css',
                    'gcalflow/styles/loader.min.css': 'gcalflow/styles/loader.css',

                    // PHP Forecast:
                    'php/forecast/styles.min.css': 'php/forecast/styles.css',

                    // Responsive Tabbed Navigation:
                    'responsive-tabbed-navigation/styles.min.css': 'responsive-tabbed-navigation/styles.css',


                    // Xibo Modules files
                    'xibo/embedded/header.min.css': 'xibo/embedded/header.css',
                    'xibo/embedded/youtube.min.css': 'xibo/embedded/youtube.css',

                    'xibo/forecast/5days.min.css': 'xibo/forecast/5days.css',
                    'xibo/forecast/current.min.css': 'xibo/forecast/current.css',
                    'xibo/forecast/table/table.min.css': 'xibo/forecast/table/table.css',

                    'xibo/ticker/media-rss-with-left-hand-text/full_width.min.css': 'xibo/ticker/media-rss-with-left-hand-text/full_width.css',
                    'xibo/ticker/media-rss-with-title/flickr.min.css': 'xibo/ticker/media-rss-with-title/flickr.css',
                    'xibo/ticker/media-rss-with-title/with_desc.min.css': 'xibo/ticker/media-rss-with-title/with_desc.css',
                    'xibo/ticker/title-only/with_logo.min.css': 'xibo/ticker/title-only/with_logo.css',
                    'xibo/ticker/title-only/with_name.min.css': 'xibo/ticker/title-only/with_name.css',

                    'xibo/twitter/tweet-with-profileimage-left/marqueeLeft.min.css': 'xibo/twitter/tweet-with-profileimage-left/marqueeLeft.css',
                }
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
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-sync');

    // Build task
    grunt.registerTask('css_build', ['less', 'cssmin']);
    //grunt.registerTask('build', ['css_build', 'xibo', 'copy']);
    grunt.registerTask('build', ['css_build', 'xibo', 'sync', 'copy']);

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