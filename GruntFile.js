/**
 *  Web Dev Grunt.js Documentation
 *
 * @class Grunt.js
 */

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('assemble-less');
    grunt.loadNpmTasks("grunt-jsbeautifier");

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            //Checks for when a .LESS (style sheet) changes and then runs ''less'
            applicationLESS: {
                files: '_development/css/module-mediaQueries/*.less',
                tasks: ['less:application'],
                options: {}
            },
            applicationMin: {
                files: ['_production/assets/css/application.css'],
                tasks: ['cssmin:application'],
                options: {}
            },
            applicationJsConcat: {
                files: ['_development/js/**/*'],
                tasks: ['concat:application'],
                options: {}
            },
            applicationUglify: {
                files: ['_production/assets/js/application.js'],
                tasks: ['uglify:application'],
                options: {}
            },
            desktopLessConcat: {
                files: ['_development/css/module-mediaQueries/desktop-less/**/*.less'],
                tasks: ['concat:desktopLESS'],
                options: {}
            },
            tabletLessConcat: {
                files: ['_development/css/module-mediaQueries/tablet-less/**/*.less'],
                tasks: ['concat:tabletLESS'],
                options: {}
            },
            mobileLessConcat: {
                files: ['_development/css/module-mediaQueries/mobile-less/**/*.less'],
                tasks: ['concat:mobileLESS'],
                options: {}
            },
            murjmationJsConcat: {
                files: ['_development/Murjmation/**/*'],
                tasks: ['concat:murjmation'],
                options: {}
            },
            murjmationUglify: {
                files: ['_production/assets/js/murjmation.js'],
                tasks: ['uglify:murjmation'],
                options: {}
            }
        },
        /**
         *    Converts LESS code to CSS code
         *
         *    @method less
         **/
        less: {
            application: {
                options: {
                    paths: '_development/css/libs',
                    imports: {
                        less: ['_development/css/libs/styleGuide.less',
                            '_development/css/libs/mixins.less',
                            '_development/css/libs/layout.less'
                        ]
                    }
                },
                files: {
                    '_production/assets/css/application.css': '_development/css/application.less'
                }
            }
        },
        /**
         *    Minifies all of the CSS files
         *
         *    @method cssmin
         **/
        cssmin: {
            application: {
                files: {
                    '_production/assets/css/application.min.css': ['_production/assets/css/application.css'],
                }
            }
        },
        /**
         *    Minifies the application.js file
         *
         *    @method uglify
         **/
        uglify: {
            options: {
                mangle: {
                    except: ['jQuery'],
                    beautify: true
                }
            },
            application: {
                files: {
                    '_production/assets/js/application.min.js': ['_production/assets/js/application.js']
                }
            },
            murjmation: {
                files: {
                    '_production/assets/js/murjmation/murjmation.min.js': ['_production/assets/js/murjmation/murjmation.js']
                }
            }
        },
        /**
         *    Combines all of the .js files and saves them as application.js
         *
         *    @method concat
         **/
        concat: {
            options: {
                separator: '\n'
            },
            //Copy (change) this information to match the name of the ALLAX file you are creating
            desktopLESS: {
                src: ['_development/css/module-mediaQueries/desktop-less/**/*.less'],
                dest: '_development/css/module-mediaQueries/desktop.less',
                nonull: true,
            },
            //Copy (change) this information to match the name of the ALLAX file you are creating
            tabletLESS: {
                src: ['_development/css/module-mediaQueries/tablet-less/**/*.less'],
                dest: '_development/css/module-mediaQueries/tablet.less',
                nonull: true,
            },
            //Copy (change) this information to match the name of the ALLAX file you are creating
            mobileLESS: {
                src: ['_development/css/module-mediaQueries/mobile-less/**/*.less'],
                dest: '_development/css/module-mediaQueries/mobile.less',
                nonull: true,
            },
            //Copy (change) this information to match the name of the ALLAX file you are creating
            application: {
                src: ['_development/js/**/*'],
                dest: '_production/assets/js/application.js',
                nonull: true,
            },
            //Copy (change) this information to match the name of the ALLAX file you are creating
            murjmation: {
                src: ['_development/Murjmation/*.js',
                    '_development/Murjmation/MurjmationAttributes/*.js',
                    '_development/Murjmation/MurjmationControls/*.js',
                    '_development/Murjmation/MurjmationTransitions/*.js'
                ],
                dest: '_production/assets/js/murjmation/murjmation.js',
                nonull: true,
            }
        },
        jsbeautifier: {
            files: ["_development/js/**/*.js", "GruntFile.js", "_production/*.html"],
            options: {
                js: {
                    indentWithTabs: true
                }

            }
        }

    });

    // Default task.
    //grunt.registerTask('default', ['less','concat','uglify','cssmin','watch']);
    grunt.registerTask('default', ['less', 'cssmin', 'concat', 'uglify', 'watch']);

    grunt.registerTask('murjmation', ['concat:murjmation', 'uglify:murjmation', 'watch:murjmationJsConcat', 'watch:murjmationUglify']);

};