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
		},

		renderRandomEntry: function(e) {
			if (!$(e.target).is('a')) { // TODO find a better way to suppress event delegation
				var unviewedEntry = this.collection.getUnviewedEntryID();
				this.trigger('routeToUnviewedEntry', unviewedEntry);
			}
		}

	});
});