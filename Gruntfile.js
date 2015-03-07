var modRewrite = require('connect-modrewrite');
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['src/js/**.js'],
      gruntfile: ['Gruntfile.js']
    },

    csslint: {
      all: {
        options: {
          import: false
        },
        src: ['src/css/*.css']
      }
    },

    htmlangular: {
      all: {
        options: {
          tmplext: 'partial.htm',
          customtags: [
              'alert'
          ],
          customattrs: []
        },
        files: {
          src: ['src/default.htm', 'src/partials/*.partial.htm']
        },
      }
    },

    processhtml: {
      dist: {
        files: {
          'dist/default.htm': ['src/default.htm']
        }
      },
      dev: {
        files: {
          'dev/default.htm': ['src/default.htm']
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/default.htm': 'dist/default.htm',
          'dist/partials/start.partial.htm': 'src/partials/start.partial.htm'
        }
      },
      dev: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dev/default.htm': 'dev/default.htm',
          'dev/partials/start.partial.htm': 'src/partials/start.partial.htm'
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/app.min.js': 'src/js/**.js'
        }
      },
      dev: {
        files: {
          'dev/app.min.js': 'src/js/**.js'
        }
      }
    },

    copy: {
      dist: {
        options: {
          flatten: true
        },
        files: {
          'dist/external/angular.min.js': 'bower_components/angular/angular.min.js',
          'dist/external/ui-bootstrap-tpls.min.js': 'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
          'dist/external/angular-cookies.min.js': 'bower_components/angular-cookies/angular-cookies.min.js',
          'dist/external/angular-resource.min.js': 'bower_components/angular-resource/angular-resource.min.js',
          'dist/external/angular-route.min.js': 'bower_components/angular-route/angular-route.min.js',
          'dist/external/angular-sanitize.min.js': 'bower_components/angular-sanitize/angular-sanitize.min.js',
          'dist/favicon.ico': 'src/favicon.ico'
        }
      },
      dev: {
        options: {
          flatten: true
        },
        files: {
          'dev/external/angular.min.js': 'bower_components/angular/angular.min.js',
          'dev/external/ui-bootstrap-tpls.min.js': 'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
          'dev/external/angular-cookies.min.js': 'bower_components/angular-cookies/angular-cookies.min.js',
          'dev/external/angular-resource.min.js': 'bower_components/angular-resource/angular-resource.min.js',
          'dev/external/angular-route.min.js': 'bower_components/angular-route/angular-route.min.js',
          'dev/external/angular-sanitize.min.js': 'bower_components/angular-sanitize/angular-sanitize.min.js',
          'dev/favicon.ico': 'src/favicon.ico'
        }
      }
    },

    cssmin: {
      dist: {
        files: {
          'dist/style.min.css': 'src/css/*.css'
        }
      },
      dev: {
        files: {
          'dev/style.min.css': 'src/css/*.css'
        }
      }
    },

    clean: {
      all: ["html-angular-validate-report.json"]
    },

    connect: {
      server: {
        options: {
          port: 8181,
          hostname: 'localhost',
          base: {
            path: 'dev',
            options: {
              index: 'default.htm'
            }
          },
          keepalive: true,
          middleware: function (connect) {
            return [
              modRewrite (['!\\.htm|\\.js|\\.svg|\\.css|\\.png|\\.jpg$ /default.htm [L]']),
              mountFolder(connect, 'dev')
            ];
          }
        }
      }
    },

    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile'],
        options: {
          reload: true
        }
      },
      js: {
        files: 'src/js/*.js',
        tasks: ['jshint', 'uglify:dev'],
      },
      css: {
        files: 'src/css/*.css',
        tasks: ['csslint', 'cssmin:dev'],
      },
      html: {
        files: ['src/default.htm', 'src/start.partial.htm'],
        tasks: ['htmlangular', 'clean', 'processhtml:dev', 'htmlmin:dev']
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-html-angular-validate');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('dev', ['uglify:dev', 'copy:dev', 'processhtml:dev', 'htmlmin:dev', 'cssmin:dev']);
  grunt.registerTask('dist', ['uglify:dist', 'copy:dist', 'processhtml:dist', 'htmlmin:dist', 'cssmin:dist']);
  grunt.registerTask('check', ['jshint', 'csslint', 'htmlangular', 'clean']);
};
