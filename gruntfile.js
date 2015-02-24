module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jsdoc : {
        dist : {
            src: ['./src/**/*.js'],
            jsdoc: './node_modules/.bin/jsdoc',
            options: {
                destination: 'docs',
                configure: './jsdoc-conf.json',
                template: './node_modules/ink-docstrap/template'
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
      }
    }
  });

  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-mocha-test');
  
  grunt.registerTask('default', 'mochaTest');

};