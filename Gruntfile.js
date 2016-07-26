/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var _ = require('underscore')._;


module.exports = function (grunt) {
    // Project configuration.



    grunt.initConfig({
        // get the configuration info from package.json
        // ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),
        // all of our configuration will go here
        // configure jshint to validate js files
        // -----------------------------------
        jshint: {
            options: {
                reporter: require('jshint-stylish')
                        // use jshint-stylish to make our errors look and read good
            },
            // when this task is run, lint the Gruntfile and all js files in src
            build: ['Gruntfile.js', 'src/**/*.js'],
            dev: ['Gruntfile.js', 'src/modules/**/*.js'],
            production: ['Gruntfile.js', 'src/**/*.js']
        },
        // remove all previous browserified builds
        clean: {
            dist: ['./dist/**/*']

        },
        // configure uglify to minify js files
        // -------------------------------------
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build1: {
                files: {
                    'dist/js/datamaize.min.js': ['src/modules/datamaize.js', 'src/modules/handsontable/datamaize.handsontable.js']
                }
            },
            dev: {
                files: {
                    'dist/js/datamaize.min.js': ['src/modules/datamaize.js', 'src/modules/handsontable/datamaize.handsontable.js']
                }
            },
            production: {
                files: {
                    'dist/js/datamaize.min.js': 'src/**/*.js'
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dev: {
                src: ['src/modules/datamaize.js', 'src/modules/handsontable/datamaize.handsontable.js'],
                dest: 'dist/js/datamaize.min.js'
            }
        },
        // compile less stylesheets to css -----------------------------------------
        less: {
            build1: {
                files: {
                    'stylesheets/css/datamaize.css': 'stylesheets/less/datamaize.less'
                }
            },
            dev: {
                files: {
                    'stylesheets/css/datamaize.css': 'stylesheets/less/datamaize.less'
                }
            },
            production: {
                files: {
                    'stylesheets/css/datamaize.css': 'css/**/*.less'
                }
            }
        },
        // configure cssmin to minify css files ------------------------------------
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build1: {
                files: {
                    'dist/css/datamaize.min.css': 'stylesheets/css/datamaize.css'
                }
            },
            dev: {
                files: {
                    'dist/css/datamaize.min.css': 'stylesheets/css/datamaize.css'
                }
            },
            production: {
                files: {
                    'dist/css/datamaize.min.css': 'stylesheets/css/datamaize.css'
                }
            }
        },
        jsObfuscate: {
            test: {
                options: {
                    concurrency: 2,
                    keepLinefeeds: false,
                    keepIndentations: false,
                    encodeStrings: true,
                    encodeNumbers: true,
                    moveStrings: true,
                    replaceNames: true,
                    variableExclusions: ['^_get_', '^_set_', '^_mtd_']
                },
                files: {
                    'dist/js/datamaize.js': [
                        'src/**/*.js'
                    ]
                }
            }
        },
        copy: {
            dev: {
                files: [
                    // includes files within path
                    {expand: true, src: ['dist/js/**'], dest: '/Library/WebServer/Documents/datamaize/demo/handsontable/assets/datamaize/', filter: 'isFile'},
                    {expand: true, src: ['dist/css/**'], dest: '/Library/WebServer/Documents/datamaize/demo/handsontable/assets/datamaize/', filter: 'isFile'}
                    // includes files within path and its sub-directories
                    //{expand: true, src: ['path/**'], dest: 'dest/'},
                    // makes all src relative to cwd
                    //{expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},
                    // flattens results to a single level
                    //{expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
                ]
            }
        },
        jasmine: {
            prod: {
                // Your project's source files
                src: 'src/**/*.js',
                // Your Jasmine spec files
                specs: 'test/jasmine/**/*.spec.js'
                        // Your spec helper files
                        //helpers: 'specs/helpers/*.js'
            },
            dev: {
                src: 'src/**/*.js',
                options: {
                    vendor: [
                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
                    ],
                    specs: 'test/jasmine/**/*.spec.js'
                }
            }

        },
        watch: {
            files: 'src/**/*.js',
            tasks: ['jasmine:prod']
        },
        simplemocha: {
            options: {
                globals: ['expect', 'window', 'jQuery'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'tap'
            },
            all: {src: ['test/**/*.js']}
        },
        "mocha-chai-sinon": {
            build: {
                src: ['./test/mocha/*.js'],
                options: {
                    ui: 'bdd',
                    reporter: 'html'
                }
            }
        },
        // Mocha
        mocha: {
            all: {
                src: ['test/mocha/*.html']
            },
            options: {
                run: true
            }
        },
        eslint: {
            options: {
                configFile: 'conf/eslint.json',
                rulePaths: ['conf/rules']
            },
            all: ['tasks/*.js', 'test/mocha/*.js']
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: '.'
                }
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf.js',
                port: 9999,
                browsers: ['Chrome', 'Firefox','PhantomJS']
            },
            
            unit: {
                background: true,
                singleRun: false
            },
            continuous: {
                singleRun: true
                //browsers: ['PhantomJS']
            },
            dev: {
                reporters: 'dots'
            }
        }










    });


    // ===========================================================================
    // LOAD GRUNT PLUGINS
    // ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('js-obfuscator');
    //grunt.loadNpmTasks('grunt-jasmine-runner');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    //grunt.loadNpmTasks('grunt-simple-mocha');
    //grunt.loadNpmTasks("grunt-mocha-chai-sinon");
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    // Load grunt mocha task
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-karma');
    //grunt.loadTasks('tasks');

    // ========= // CREATE TASKS =========

    // this default task will go through all configuration (dev and production) in each task 
    grunt.registerTask('default', ['jshint', 'uglify', 'less', 'cssmin']);

    // this task will only run the dev configuration 
    grunt.registerTask('dev', ['jshint:dev', 'less:dev', 'cssmin:dev', 'concat:dev', 'copy:dev']);

    // only run production configuration 
    grunt.registerTask('production', ['jshint:production', 'uglify:production', 'less:production', 'cssmin:production']);


    grunt.registerTask('testmocha1', 'Run Mocha tests.', function () {
        // If not --test option is specified, run all tests.
        var test_case = grunt.option('test') || '**/*';
        grunt.log.write('Test Case: ' + test_case);

        grunt.config.set('mocha.browser', ['test/mocha/' + test_case + '.html']);
        grunt.task.run('mocha');
    });



};
