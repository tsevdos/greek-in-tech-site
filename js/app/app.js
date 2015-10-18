define([
	'jquery',
	'underscore',
	'backbone',
	'router/AppRouter',
], function($, _, Backbone, AppRouter) {

	var initialize = function() {
		var appRouter = new AppRouter();
		Backbone.history.start();
	};

	return {
		init: initialize
	};

});
