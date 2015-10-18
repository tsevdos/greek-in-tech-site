define([
	'jquery',
	'underscore',
	'backbone',
	'views/EntryView'
], function($, _, Backbone, EntryView){
	return Backbone.View.extend({
		el: $('body'),
		events: {
			'click' : "renderRandomEntry"
		},

		initialize: function(options) {
			this.collection = options.collection;
			this.router = options.router;
		},

		renderRandomEntry: function() {
			var unviewedEntry = this.collection.getUnviewedEntryID();
			this.router.navigate("entry/" + unviewedEntry.toString(), { trigger: true });
		}

	});
});