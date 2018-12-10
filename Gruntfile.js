"use strict";

module.exports = function(grunt) {
  const sass = require('node-sass');

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    sass: {
      options: {
        implementation: sass
      },

      style: {
        files: {
          'css/style.css': 'sass/style.scss'
        }
      },

      fontAwesome: {
        files: {
          'css/font-awesome.css': 'sass/font-awesome/font-awesome.scss'
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({
            browsers: ['last 2 versions']
          })
        ]
      },
      dist: {
        src: 'css/*.css'
      }
    },

    csso: {
      minify: {
        expand: true,
        cwd: 'css/',
        src: ['*.css', '!*.min.css'],
        dest: 'css/',
        ext: '.min.css'
      }
    },

    clean: {
      build: ['build/']
    },

    copy: {
      build: {
        files: [{
          expand: true,
          src: [
            '*.html',
            'img/*',
            'fonts/**',
            'css/*'
          ],
          dest: 'build/'
        }]
      }
    },

    watch: {
      css: {
        files: 'sass/**/*.scss',
        tasks: ['sass:style']
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            '*.html',
            'css/style.css'
          ]
        },
        options: {
          watchTask: true,
          server: './'
        }
      }
    }
  });

  grunt.registerTask('build', ['sass', 'postcss', 'csso', 'clean:build', 'copy:build']);
  grunt.registerTask('server', ['browserSync', 'watch']);
  grunt.registerTask('fontAwesome', ['sass:fontAwesome']);
}
