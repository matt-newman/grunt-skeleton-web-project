module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: ['src/js/*.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false,
                }
            },
            sass: {
                files: 'src/sass/**',
                tasks: ['sass', 'cssmin'],
                options: {
                    livereload: true,
                    spawn: false,
                }
            },
        },
        copy: {
            main: {
                files: [
                    // copies js lib files to dest folder
                    {
                        expand: true,
                        cwd: 'src/js/lib',
                        src: ['*.js'],
                        dest: 'dest/js/lib',
                        filter: 'isFile'
                    }
                ],
            },
        },
        jshint: {
            files: ['gruntfile.js', 'src/js/main.js'],
            options: {
                jshintrc: '.jshintrc',
                globals: {
                    jQuery: true,
                    Modernizr: true
                }
            }
        },
        sass: {
            dest: { // Target
                options: { // Target options
                    style: 'expanded'
                },
                files: {
                    'src/css/main.css': 'src/sass/build.scss' // 'destination': 'source'
                }
            }
        },
        uglify: {
            options: {
                mangle: {
                    except: ['jQuery']
                }
            },
            mainjs: {
                options: {
                    sourceMap: 'dest/main.min.js.map'
                },
                files: {
                    'dest/js/main.min.js': ['src/js/main.js'],
                }
            }
        },
        cssmin: {
            compress: {
                files: {
                    "dest/css/main.min.css": ['src/css/lib/normalize.css', 'src/css/main.css']
                }
            }
        },
        imagemin: {
            dynamic: { // Another target
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: 'src/img/', // Src matches are relative to this path
                    src: ['*.{png,jpg,gif}'], // Actual patterns to match
                    dest: 'dest/img/' // Destination path prefix
                }]
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '.'
                }
            },
            test: {
                options: {
                    port: 9002,
                    base: '.'
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['copy', 'jshint', 'sass', 'uglify', 'cssmin', 'imagemin']);
    grunt.registerTask('server', ['default', 'connect:server:keepalive']);
};