module.exports = function(grunt) {
    grunt.loadNpmTasks( 'grunt-html2js' );
    grunt.loadNpmTasks( 'grunt-contrib-less' );
    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-concat-sourcemap' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-karma' );
    grunt.loadNpmTasks( 'grunt-autoprefixer' );


    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),
        html2js: {
            /**
             * These are the templates from `src/app`.
             */
            app: {
                options: {
                    base: 'src'
                },
                src: ['src/**/*.tpl.html'],
                dest: 'build/templates-app.js'
            }
        },
        less: {
            all: {
                files: [
                    {
                        expand: true,
                        cwd: 'styles',
                        src: ['*.less'],
                        dest: 'build/styles',
                        ext: '.css'
                    }
                ],
                options: {
                    report: 'gzip'
                }
            }
        },
        connect: {
            serve: {
                options: {
                    port: 8080,
                    base: 'build/',
                    hostname: '*',
                    debug: true,
                    keepalive: true
                }
            }
        },
        watch: {
            options: {
                atBegin: true
            },
            templates: {
                files: ['src/**/*.tpl.html'],
                tasks: ['html2js']
            },
            less: {
                files: ['style.less', 'src/**/*.less'],
                tasks: ['less']
            },
            sources: {
                files: ['src/**/*.js', 'src/*.js'],
                tasks: ['concat_sourcemap:app']
            },
            index: {
                files: 'index.html',
                tasks: ['copy:index']
            }
            // Useful for watching / rerunning karma tests
            // jsTest: {
            //    files: ['test/spec/{,*/}*.js'],
            //    tasks: ['karma']
            //}
        },
        concat_sourcemap: {
            options: {
                sourcesContent: true
            },
            app: {
                src: ['src/**/*.js', 'src/*.js'],
                dest: 'build/app.js'
            },
            libs: {
                src: [
                    'libs/angular/angular.js',
                    'libs/angular-animate/angular-animate.js',
                    'libs/angular-mocks/angular-mocks.js',
                    'libs/angular-ui-router/release/angular-ui-router.js',
                    'libs/skel/dist/skel.min.js',
                    'libs/jquery/dist/jquery.min.js',
                    'libs/bootstrap/dist/js/bootstrap.min.js',
                    'libs/jasny-bootstrap/dist/js/jasny-bootstrap.min.js',
                    'libs/angular-aside/dist/js/angular-aside.min.js'
                ],
                dest: 'build/libs.js'
            }
        },
        concat: {
            css: {
                src: ['libs/jasny-bootstrap/dist/css/jasny-bootstrap.min.css',
                'libs/angular-aside/dist/css/angular-aside.min.css'],
                dest: 'build/styles/css-libs.css'
            }
        },
        copy: {
            index: {
                src: 'index.html',
                dest: 'build/',
                options: {
                    processContent: function(content, srcpath) {
                        // Compiling index.html file!
                        var packageVersion = require( './package.json' ).version;
                        return grunt.template.process( content, {
                            data: {
                                version: packageVersion
                            }
                        } );
                    }
                }
            },
            css: {
                files: [
                    {
                        expand: true,
                        cwd: 'styles',
                        src: ['*.css'],
                        dest: 'build/styles'
                    }
                ]
            }
        },
        clean: {
            all: {
                src: ['build/']
            }
        },
        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        }
    } );

    // Build process:
    // - clean build/
    // - creates build/templates-app.js from *.tpl.html files
    // - creates build/style.css from all the .less files
    // - concatenates all the source files in build/app.js - banner with git revision
    // - concatenates all the libraries in build/libs.js
    // - copies index.html over build/
    grunt.registerTask( 'build', ['clean', 'html2js', 'less', 'concat_sourcemap:app', 'concat_sourcemap:libs', 'concat:css', 'copy'] );
    grunt.registerTask( 'default', ['clean', 'concat_sourcemap:libs', 'connect', 'watch'] );
    grunt.registerTask( 'test', ['karma'] );
};