define([
	'router/AppRouter',
	'backbone'
], function(AppRouter) {

	var initialize = function() {
		var appRouter = new AppRouter();
		Backbone.history.start();
	};

	return {
		init: initialize
	};

});
