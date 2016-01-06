requirejs.config({
	baseUrl: '../js/app',
	paths: {
		jquery: '../vendor/jQuery/dist/jquery.min',
		underscore: '../vendor/underscore/underscore-min',
		backbone: '../vendor/backbone/backbone-min',
		text : '../vendor/requirejs-text/text',
		hammer : '../vendor/hammerjs/hammer',
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
		'chai': {
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