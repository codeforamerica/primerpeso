module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    // Wipe out previous builds and test reporting.
    clean: ["dist/", "client/test/reports"],

    // Run your source code through JSHint's defaults.
    jshint: ["client/app/**/*.js"],

    // This task uses James Burke's excellent r.js AMD builder to take all
    // modules and concatenate them into a single file.
    requirejs: {
      release: {
        options: {
          mainConfigFile: "client/app/config.js",
          generateSourceMaps: true,
          include: ["main"],
          out: "dist/source.min.js",
          optimize: "uglify2",

          // Since we bootstrap with nested `require` calls this option allows
          // R.js to find them.
          findNestedDependencies: true,

          // Include a minimal AMD implementation shim.
          name: "almond",

          // Setting the base url to the distribution directory allows the
          // Uglify minification process to correctly map paths for Source
          // Maps.
          baseUrl: "dist/app",

          // Wrap everything in an IIFE.
          wrap: true,

          // Do not preserve any license comments when working with source
          // maps.  These options are incompatible.
          preserveLicenseComments: false
        }
      }
    },

    // This task simplifies working with CSS inside Backbone Boilerplate
    // projects.  Instead of manually specifying your stylesheets inside the
    // HTML, you can use `@imports` and this task will concatenate only those
    // paths.
    styles: {
      // Out the concatenated contents of the following styles into the below
      // development file path.
      "dist/styles.css": {
        // Point this to where your `index.css` file is location.
        src: "client/app/styles/index.css",

        // The relative path to use for the @imports.
        paths: ["client/app/styles"],

        // Prefix.
        prefix: "./client/app/styles/",

        // Rewrite image paths during release to be relative to the `img`
        // directory.
        forceRelative: "/client/app/img/"
      }
    },

    // Minify the distribution CSS.
    cssmin: {
      release: {
        files: {
          "dist/styles.min.css": ["dist/styles.css"]
        }
      }
    },


    processhtml: {
      release: {
        files: {
          "dist/index.html": ["index.html"]
        }
      }
    },

    // Move vendor and app logic during a build.
    copy: {
      release: {
        files: [
          { expand: true,
          	cwd: 'client/',
          	src: ["app/**", "vendor/**"],
          	dest: "dist/"
          }
        ]
      }
    },

    compress: {
      release: {
        options: {
          archive: "dist/source.min.js.gz"
        },

        files: ["dist/source.min.js"]
      }
    },

    // Unit testing is provided by Karma.  Change the two commented locations
    // below to either: mocha, jasmine, or qunit.
    karma: {
      options: {
        basePath: process.cwd(),
        singleRun: true,
        captureTimeout: 7000,
        autoWatch: true,
        logLevel: "ERROR",

        reporters: ["dots", "coverage"],
        browsers: ["PhantomJS"],

        // Change this to the framework you want to use.
        frameworks: ["mocha"],

        plugins: [
          "karma-jasmine",
          "karma-mocha",
          "karma-qunit",
          "karma-phantomjs-launcher",
          "karma-coverage"
        ],

        preprocessors: {
          "client/app/**/*.js": "coverage"
        },

        coverageReporter: {
          type: "lcov",
          dir: "client/test/coverage"
        },

        files: [
          // You can optionally remove this or swap out for a different expect.
          "vendor/bower/chai/chai.js",
          "vendor/bower/requirejs/require.js",
          "client/test/runner.js",

          { pattern: "client/app/**/*.*", included: false },
          // Derives test framework from Karma configuration.
          {
            pattern: "client/test/<%= karma.options.frameworks[0] %>/**/*.spec.js",
            included: false
          },
          { pattern: "vendor/**/*.js", included: false }
        ]
      },

      // This creates a server that will automatically run your tests when you
      // save a file and display results in the terminal.
      daemon: {
        options: {
          singleRun: false
        }
      },

      // This is useful for running the tests just once.
      run: {
        options: {
          singleRun: true
        }
      }
    },

    coveralls: {
      options: {
        coverage_dir: "client/test/coverage/"
      }
    },
    inject: {
		  single: {
		    scriptSrc: 'client/devtools/workflow.js',
		    files: {
		      'client/index.html': 'client/index.html'
		    }
		  }
		},
    concurrent: {
      dev: {
        tasks: ['nodemon', 'node-inspector', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    nodemon: {
		  dev: {
		    script: 'server.js',
		    options: {
		      nodeArgs: ['--debug'],
		      env: {
		        PORT: '3737'
		      },
		      // Omit this property if you aren't serving HTML files and
		      // don't want to open a browser tab on start
		      callback: function (nodemon) {
		        nodemon.on('log', function (event) {
		          console.log(event.colour);
		        });

		        // opens browser on initial server start
		        nodemon.on('config:update', function () {
		          // Delay before server listens on port
		          setTimeout(function() {
		            require('open')('http://localhost:3737');
		          }, 1000);
		        });

		        // refreshes browser when server reboots
		        nodemon.on('restart', function () {
		          // Delay before server listens on port
		          setTimeout(function() {
		            require('fs').writeFileSync('.rebooted', 'rebooted');
		          }, 1000);
		        });
		      }
		    }
		  },
		},
		watch: {
  		server: {
    		files: ['.rebooted'],
    		options: {
      		livereload: true
    		}
  		}
		}
  });

  // Grunt contribution tasks.
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-compress");
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-node-inspector');
  grunt.loadNpmTasks('grunt-node-inspector');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-inject');



  // Third-party tasks.
  grunt.loadNpmTasks("grunt-karma");
  grunt.loadNpmTasks("grunt-karma-coveralls");
  grunt.loadNpmTasks("grunt-processhtml");

  // Grunt BBB tasks.
  grunt.loadNpmTasks("grunt-bbb-requirejs");
  grunt.loadNpmTasks("grunt-bbb-styles");

  // When running the default Grunt command, just lint the code.
  grunt.registerTask("default", [
    "clean",
    "jshint",
    "processhtml",
    "copy",
    "requirejs",
    "styles",
    "cssmin",
  ]);

  grunt.registerTask("server", [
    //"inject",
    "nodemon"
  ]);
};
