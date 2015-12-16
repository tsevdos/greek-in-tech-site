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
				run: true
			}
		}
	});

	//load grunt mocha task
	grunt.loadNpmTasks('grunt-mocha');

	grunt.registerTask('default', ['mocha']);
};