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
    grunt.loadNpmTasks( 'grunt-contrib-imagemin' );


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
        imagemin: { // Task
            dynamic: { // Another target
                files: [{
                    expand: true, // Enable dynamic expansion
                    src: ['images/**/*.{png,jpg,gif}'], // Actual patterns to match
                    dest: 'build/images' // Destination path prefix
                }]
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
        // The actual grunt server settings
        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            // courtesy of Phubase Tiewthanom
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            connect.static( 'build' )
                        ];
                    }
                }
            }
        },
        watch: {
            templates: {
                files: ['src/**/*.tpl.html'],
                tasks: ['html2js']
            },
            less: {
                files: ['styles/*.less'],
                tasks: ['less']
            },
            sources: {
                files: ['src/**/*.js', 'src/*.js'],
                tasks: ['concat_sourcemap:app']
            },
            index: {
                files: ['*.html'],
                tasks: ['copy:html']
            },
            css: {
                files: ['styles/*.css'],
                tasks: ['concat:css']
            },
            // Useful for watching / rerunning karma tests
            // jsTest: {
            //    files: ['test/spec/{,*/}*.js'],
            //    tasks: ['karma']
            //}
            images: {
                files: ['images/**/*.{png,jpg,gif}'],
                tasks: ['copy:images'],
                options: {
                    spawn: false,
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: ['*.html']
            }
        },
        concat_sourcemap: {
            options: {
                sourcesContent: true
            },
            app: {
                src: ['src/*.js', 'src/**/*.js'],
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
                    'libs/angular-aside/dist/js/angular-aside.min.js',
                    'libs/d3/d3.js',
                    'libs/nvd3/build/nv.d3.js',
                    'libs/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.js',
                    'libs/chartjs/chart.js',
                    'libs/angles/angles.js',
                    'libs/raphael/raphael.js',
                    'js/vendor/morris.js',
                    'libs/metisMenu/dist/metisMenu.js'
                ],
                dest: 'build/libs.js'
            }
        },
        concat: {
            libs: {
                src: ['libs/jasny-bootstrap/dist/css/jasny-bootstrap.min.css',
                    'libs/angular-aside/dist/css/angular-aside.min.css',
                    'libs/nvd3/build/nv.d3.css',
                    'js/vendor/morris.css',
                'libs/metisMenu/dist/metisMenu.css'],
                dest: 'build/styles/css-libs.css'
            },
            css: {
                src: ['styles/*.css'],
                dest: 'build/styles/additional.css'
            }
        },
        copy: {
            fonts: {
                cwd: 'libs/font-awesome/fonts/',
                expand: true,
                src: ['*'],
                dest: 'build/fonts/'
            },
            glyphicons: {
                cwd: 'libs/bootstrap/fonts/',
                expand: true,
                src: ['*'],
                dest: 'build/fonts/'
            },
            html: {
                src: ['index.html', 'dashboard.html'],
                dest: 'build/'

            },
            images: {
                src: ['images/*.{png,jpg,gif}'],
                dest: 'build/'
            },
            css: {
                expand: true,
                cwd: 'libs/',
                src: ['bootstrap/dist/css/bootstrap.min.css',
                    'jasny-bootstrap/dist/css/jasny-bootstrap.min.css',
                    'angular-aside/dist/css/angular-aside.min.css',
                    'nvd3/build/nv.d3.css',
                    'morrisjs/morris.css',
                'metisMenu/dist/metisMenu.css'],
                flatten: true,
                dest: 'build/vendor/css/'
            },
            customcss: {
                src: ['styles/*.css'],
                expand: true,
                flatten: true,
                dest: 'build/styles/'
            },
            js: {
                expand: true,
                cwd: 'libs/',
                src: ['angular/angular.js',
                    'angular-animate/angular-animate.js',
                    'angular-mocks/angular-mocks.js',
                    'angular-ui-router/release/angular-ui-router.js',
                    'skel/dist/skel.min.js',
                    'jquery/dist/jquery.min.js',
                    'jquery/dist/jquery.min.map',
                    'bootstrap/dist/js/bootstrap.min.js',
                    'jasny-bootstrap/dist/js/jasny-bootstrap.min.js',
                    'angular-aside/dist/js/angular-aside.min.js',
                    'd3/d3.js',
                    'nvd3/build/nv.d3.js',
                    'angularjs-nvd3-directives/dist/angularjs-nvd3-directives.js',
                    'chartjs/chart.js',
                    'angles/angles.js',
                    'raphael/raphael.js',
                    'vendor/morris.js',
                'metisMenu/dist/metisMenu.js'],
                flatten: true,
                dest: 'build/vendor/js/'
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

    grunt.event.on( 'watch', function(action, filepath, target) {
        grunt.log.writeln( target + ': ' + filepath + ' has ' + action );
    } );

    // Build process:
    // - clean build/
    // - creates build/templates-app.js from *.tpl.html files
    // - creates build/style.css from all the .less files
    // - concatenates all the source files in build/app.js - banner with git revision
    // - concatenates all the libraries in build/libs.js
    // - copies index.html over build/
    grunt.registerTask( 'build', ['clean', 'html2js', 'less', 'concat_sourcemap', 'concat', 'copy'] );
    grunt.registerTask( 'default', ['build', 'connect:livereload', 'watch'] );
    grunt.registerTask( 'test', ['karma'] );
};