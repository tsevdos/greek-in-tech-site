requirejs.config({
	baseUrl: 'js/app',
	paths: {
		jquery: '../vendor/jQuery/dist/jquery.min',
		underscore: '../vendor/underscore/underscore-min',
		backbone: '../vendor/backbone/backbone-min',
		text : "../vendor/requirejs-text/text"
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
		}
	}
});

requirejs([
	'app'
], function(App) {
	App.init();
});