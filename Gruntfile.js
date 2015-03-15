module.exports = function(grunt) {

	/**
	 * Load required Grunt tasks. These are installed based on the versions listed
	 * in `package.json` when you do `npm install` in this directory.
	 */

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-ejs');
	grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	var userConfig = {
		buildDir: "build",
		srcDir: "www"
	}

	var taskConfig = {
		copy: {
			assets: {
				files: [{
					src: ['**'],
					dest: '<%= buildDir %>/img/',
					cwd: '<%= srcDir %>/img/',
					expand: true
				}, {
					src: ['**'],
					dest: '<%= buildDir %>/fonts/',
					cwd: '<%= srcDir %>/fonts/',
					expand: true
				}, {
					src: ['**'],
					dest: '<%= buildDir %>/js/',
					cwd: '<%= srcDir %>/js/',
					expand: true
				}]
			}
		},

		ejs: {
			all: {
				src: ['**/*.ejs', '!partials/**/*'],
				dest: '<%= buildDir %>/',
				expand: true,
				cwd: '<%= srcDir %>/',
				ext: '.html',
			},
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: '<%= buildDir %>/css',
					src: ['*.css', '!*.min.css'],
					dest: '<%= buildDir %>/css',
					ext: '.min.css'
				}]
			}
		},
		sprite: {
			all: {
				src: '<%= srcDir %>/img/icons/*.png',
				dest: '<%= srcDir %>/img/spritebase.png',
				destCss: '<%= srcDir %>/sass/helpers/_icons.scss',
				imgPath: '../img/spritebase.png',
				algorithm: 'top-down'
			}
		},
		sass: {
			compile: {
				options: {
					loadPath: require('node-bourbon').includePaths
				},
				files: {
					'<%= buildDir %>/css/main.css': '<%= srcDir %>/sass/main.scss'
				}
			},
			bootstrap: {
				files: {
					'<%= buildDir %>/css/bootstrap.css': '<%= srcDir %>/sass/bootstrap.scss'
				}
			},
			fontawesome: {
				files: {
					'<%= buildDir %>/css/font-awesome.css': '<%= srcDir %>/sass/font-awesome.scss'
				}
			}

		},

		delta: {
			options: {
				livereload: true
			},
			/**
			 * When the SCSS files change, we need to compile and copy to build dir
			 */
			sass: {
				files: ['<%= srcDir %>/**/*.scss'],
				tasks: ['sass:compile'],
				options: {
					livereload: true
				},
			},
			sprite: {
				files: [
					'<%= srcDir %>/sass/helpers/_icons.scss',
					'<%= srcDir %>/img/icons/*.png',
					'<%= srcDir %>/img/spritebase.png'
				],
				tasks: ['sprite:all'],
				options: {
					livereload: true
				},
			},
			/**
			 * When .ejs file changes, we need to compile ejs into HTML.
			 */
			html: {
				files: ['<%= srcDir %>/**/*.ejs'],
				tasks: ['ejs:all'],
				options: {
					livereload: true
				},
			},

			assets: {
				files: [
					'<%= srcDir %>/img/**/*',
					'<%= srcDir %>/fonts/**/*',
					'<%= srcDir %>/js/**/*',
				],
				tasks: ['copy:assets']
			},

			js: {
				files: ['<%= srcDir %>/js**/*'],
				options: {
					livereload: true
				},
			}

		}
	}

	grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));
	// grunt.config.init(taskConfig);

	grunt.renameTask('watch', 'delta');
	grunt.registerTask('watch', [
		'sass:bootstrap',
		'sass:fontawesome',
		'sass:compile',
		'ejs:all',
		'copy:assets',
		"sprite:all",
		'delta'
	]);

	grunt.registerTask('build', [
		'sass:bootstrap',
		'sass:fontawesome',
		'sass:compile',
		'ejs:all',
		"sprite:all",
		'copy:assets'
	]);

	grunt.registerTask('default', ['sass:bootstrap', 'sass:fontawesome', 'sass:compile']);

}
