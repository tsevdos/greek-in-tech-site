define([
	'backbone',
	'./router/AppRouter'
], function(Backbone, AppRouter) {

	var initialize = function() {
		var appRouter = new AppRouter();
		Backbone.history.start();
	};

	return {
		init: initialize
	};

});
