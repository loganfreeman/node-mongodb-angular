var config = require( './src/config/config.js' );

module.exports = function(grunt) {

    require( 'load-grunt-tasks' )( grunt );

    grunt.template.addDelimiters( 'handlebars-like-delimiters', '{{', '}}' );


    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),


        'template': {
            'process-html-template': {
                'options': {
                    'data': {
                        'title': 'My blog post',
                        'author': 'Mathias Bynens',
                        'content': 'Lorem ipsum dolor sit amet.',
                        'baseUrl': config.getBaseUrl()
                    },
                    'delimiters': 'handlebars-like-delimiters'
                },
                'files': {
                    'swagger-ui/index.html': ['swagger-ui/index.html.tpl']
                }
            }
        },
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