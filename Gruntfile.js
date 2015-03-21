module.exports = function(grunt) {
  grunt.initConfig({ pkg: grunt.file.readJSON('package.json') });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.config('jshint', {
    all: ['src/js/**.js'],
    gruntfile: ['Gruntfile.js']
  });

  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.config('csslint', {
    all: {
      options: {
        import: false
      },
      src: ['src/css/*.css']
    }
  });

  grunt.loadNpmTasks('grunt-html-angular-validate');
  grunt.config('htmlangular', {
    all: {
      options: {
        tmplext: 'partial.htm',
        customtags: [
          'alert'
        ],
        customattrs: [
          'key-enter',
          'key-escape',
          'click-focus',
          'owner-exists',
          'typeahead',
          'typeahead-on-select',
          'typeahead-editable',
          'contributors-selected'
        ]
      },
      files: {
        src: ['src/default.htm', 'src/partials/*.partial.htm']
      },
    }
  });

  grunt.loadNpmTasks('grunt-processhtml');
  grunt.config('processhtml', {
    dist: {
      files: {
        'dist/default.htm': ['src/default.htm']
      }
    },
    dev: {
      files: {
        'C:/inetpub/wwwroot/ghgame/default.htm': ['src/default.htm'],
        'C:/inetpub/wwwroot/ghgame/partials/start.partial.htm': 'src/partials/start.partial.htm',
        'C:/inetpub/wwwroot/ghgame/partials/game.partial.htm': 'src/partials/game.partial.htm'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.config('htmlmin', {
    dist: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      files: {
        'dist/default.htm': 'dist/default.htm',
        'dist/partials/start.partial.htm': 'src/partials/start.partial.htm',
        'dist/partials/game.partial.htm': 'src/partials/game.partial.htm'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.config('uglify', {
    dist: {
      files: {
        'dist/app.min.js': 'src/js/**.js'
      }
    },
    dev: {
      options: {
        beautify: true
      },
      files: {
        'C:/inetpub/wwwroot/ghgame/app.min.js': 'src/js/**.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.config('copy', {
    dist: {
      files: [
        { expand: true, flatten: true, cwd: 'bower_components/', src: [
          'angular/angular.min.js',
          'angular-bootstrap/ui-bootstrap-tpls.min.js',
          'angular-cookies/angular-cookies.min.js',
          'angular-resource/angular-resource.min.js',
          'angular-route/angular-route.min.js',
          'angular-sanitize/angular-sanitize.min.js'
          ],
          dest: 'dist/external'
        },
        { src: 'src/favicon.ico', dest: 'dist/favicon.ico' },
        { expand: true, flatten: true, src: 'src/assets/*', dest: 'dist/assets' }
      ]
    },
    dev: {
      files: [
        { expand: true, flatten: true, cwd: 'bower_components/', src: [
          'angular/angular.js',
          'angular-bootstrap/ui-bootstrap-tpls.js',
          'angular-cookies/angular-cookies.js',
          'angular-resource/angular-resource.js',
          'angular-route/angular-route.js',
          'angular-sanitize/angular-sanitize.js'
          ],
          dest: 'C:/inetpub/wwwroot/ghgame/external'
        },
        { src: 'src/favicon.ico', dest: 'C:/inetpub/wwwroot/ghgame/favicon.ico' },
        { expand: true, flatten: true, src: 'src/assets/*', dest: 'C:/inetpub/wwwroot/ghgame/assets' }
      ]
    },
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.config('cssmin', {
    dist: {
      files: {
        'dist/style.min.css': 'src/css/*.css'
      }
    },
    dev: {
      files: {
        'C:/inetpub/wwwroot/ghgame/style.min.css': 'src/css/*.css'
      },
      options: {
        keepBreaks: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.config('clean', {
    check: ['html-angular-validate-report.json'],
    dist: ['dist/'],
    dev: {
      src: ['C:/inetpub/wwwroot/ghgame/*'],
      options: { force: true }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.config('watch', {
    gruntfile: {
      files: 'Gruntfile.js',
      tasks: ['jshint:gruntfile'],
      options: {
        reload: true
      }
    },
    js: {
      files: 'src/js/*.js',
      tasks: ['jshint', 'uglify:dev']
    },
    css: {
      files: 'src/css/*.css',
      tasks: ['csslint', 'cssmin:dev']
    },
    html: {
      files: ['src/default.htm', 'src/partials/start.partial.htm', 'src/partials/game.partial.htm'],
      tasks: ['processhtml:dev']
    }
  });

  grunt.registerTask('dev', ['clean:dev', 'uglify:dev', 'copy:dev', 'processhtml:dev', 'cssmin:dev']);
  grunt.registerTask('dist', ['clean:dist', 'uglify:dist', 'copy:dist', 'processhtml:dist', 'htmlmin:dist', 'cssmin:dist']);
  grunt.registerTask('check', ['jshint', 'csslint', 'htmlangular', 'clean:check']);
};
