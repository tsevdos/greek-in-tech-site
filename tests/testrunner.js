requirejs.config({
	baseUrl: '../js/app',
	paths: {
		jquery: '../../node_modules/jquery/dist/jquery.min',
		underscore: '../../node_modules/underscore/underscore-min',
		backbone: '../../node_modules/backbone/backbone-min',
		text : '../../node_modules/requirejs-text/text',
		hammer : '../node_modules/hammerjs/hammer.min',
		chai: '../../node_modules/chai/chai'
	},
	shim: {
		backbone: {
			deps: ['jquery', 'underscore'],
			exports: 'Backbone'
		},
		jquery: {
			exports: '$'
		},
		underscore: {
			exports: '_'
		},
		chai: {
			exports: 'chai'
		}
	}
});

define(function (require) {
	// Chai
	var chai = require('chai');
	expect = chai.expect;

	require([
		'text!data/entries.json',
		'collection-test.js',
		'model-test.js'
	], function (require) {
		mocha.run();
	});

});