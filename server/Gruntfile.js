module.exports = function(grunt) {

    require( 'load-grunt-tasks' )( grunt );


    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),
        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'results.txt', // Optionally capture the reporter output to a file
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
                },
                src: ['test/**/*.js']
            },
            server: {
                options: {
                    reporter: 'spec',
                    captureFile: 'results.txt', // Optionally capture the reporter output to a file
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
                },
                src: ['rest/**/*.js']
            }
        },

        jsdoc: {
            dist: {
                src: ['src/**/*.js', 'test/**/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        },

        nodemon: {
            dev: {
                script: 'src/server.js'
            }
        }
    } );

    grunt.registerTask( 'test', ['mochaTest:test'] );

    grunt.registerTask( 'rest', ['mochaTest:server'] );
};