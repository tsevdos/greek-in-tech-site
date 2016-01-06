//Gruntfile.js
module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		//mocha
		mocha: {
			all: {
				src: ['tests/testrunner.html']
			},
			options: {
				run: false
			}
		},

		sass: {
			dist: {
				options: {
					style: 'compressed',
					sourcemap: 'none',
					compass: true
				},
				files: {
					'css/main.css': 'scss/main.scss'
				}
			}
		},

		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			}
		}

	});

	//load grunt mocha task
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['mocha']);
	grunt.registerTask('dev', ['watch']);
	grunt.registerTask('styles', ['sass']);

};