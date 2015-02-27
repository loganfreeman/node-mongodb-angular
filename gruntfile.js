module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jsdoc: {
            dist: {
                src: ['./src/**/*.js'],
                jsdoc: './node_modules/.bin/jsdoc',
                options: {
                    destination: 'docs',
                    configure: './jsdoc-conf.json',
                    template: './node_modules/ink-docstrap/template'
                }
            }
        },

        jslint: {
            server: {
                src: ['src/**/*.js'],
                // lint options
                directives: {
                    // node environment
                    node: true,
                    // browser environment
                    browser: false,
                    // allow dangling underscores
                    nomen: true,
                    // allow todo statements
                    todo: true,
                    // allow unused parameters
                    unparam: true,
                    // don't require strcit pragma
                    sloppy: true,
                    // allow whitespace discrepencies
                    white: true
                },
                options: {
                    edition: 'latest',
                    junit: 'out/server-junit.xml',
                    log: 'out/server-lint.log',
                    jslintXml: 'out/server-jslint.xml',
                    errrosOnly: true,
                    failOnError: false,
                    checkstyle: 'out/server-checkstyle.xml'
                }

            }
        },

        jssemicoloned: {
            files: ['*.js', 'src/**/*.js', 'test/**/*.js']
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
            }
        }
    });

    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-jssemicoloned');

    grunt.registerTask('default', 'mochaTest');

    grunt.registerTask('lint', ['jssemicoloned', 'jslint']);

};