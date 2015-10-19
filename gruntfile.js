module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: ['src/js/*.js', 'test/*.spec.js'],
                tasks: ['jshint', 'jasmine'],
                options: {
                    spawn: false,
                }
            },
            sass: {
                files: 'src/sass/**',
                tasks: ['sass', 'postcss', 'cssmin'],
                options: {
                    livereload: true,
                    spawn: false,
                }
            },
            images: {
                files: ['src/img/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
                options: {
                    livereload: true,
                    spawn: false
                }
            }
        },
        copy: {
            main: {
                files: [
                    // copies js lib files to target folder
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['js/lib/*.js'],
                        dest: 'target',
                        timestamp: true
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
        jasmine: {
            main: {
                src: 'src/js/*.js',
                options: {
                    keepRunner: true,
                    specs: 'test/*.spec.js'
                }
            }
        },
        sass: {
            dest: { // Target
                options: { // Target options
                    style: 'expanded'
                },
                files: {
                    'src/css/main.css': 'src/sass/build.scss' // 'targetination': 'source'
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
                    sourceMap: 'target/main.min.js.map'
                },
                files: {
                    'target/js/main.min.js': ['src/js/main.js'],
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            dist: {
                src: 'src/css/main.css'
            }
        },
        cssmin: {
            compress: {
                files: {
                    "target/css/main.min.css": ['src/css/lib/normalize.css', 'src/css/main.css']
                }
            }
        },
        imagemin: {
            dynamic: { // Another target
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: 'src/img/', // Src matches are relative to this path
                    src: ['*.{png,jpg,gif}'], // Actual patterns to match
                    dest: 'target/img/' // destination path prefix
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
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-sass');    
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['copy', 'jshint', 'jasmine', 'sass', 'uglify', 'postcss', 'cssmin', 'imagemin']);
    grunt.registerTask('server', ['default', 'connect:server:keepalive']);
};