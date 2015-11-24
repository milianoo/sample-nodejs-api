/*jslint node: true */
'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: true,
                reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
            },

            // when this task is run, lint the Gruntfile and all js files in src
            files: ['Gruntfile.js', './app/controller/*.js','./app/model/*.js', './app/*.js']
        },
        mochaTest: {
            'spec': {
                options: {
                    reporter: 'spec',
                    // tests are quite slow as thy spawn node processes
                    timeout: 10000,
                    clearRequireCache: true
                },
                src: ['./test/**/*.js']
            }
        },
        watch: {
            all: {
                files: ['./app/**/*.js', './test/**/*.js'],
                tasks: ['jshint', 'mochaTest']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('default', ['jshint', 'mochaTest']);
};