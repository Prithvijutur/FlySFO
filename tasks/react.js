'use strict';

module.exports = function react(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-react');

	// Options
	return {
		single_file_output: {
			files: {
				'public/js/app.js': 'public/js/app.jsx',
				'public/js/menu.js': 'public/js/menu.jsx'
			}
		}
	};
};
