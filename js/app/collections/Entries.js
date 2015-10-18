define([
	'jquery',
	'underscore',
	'backbone',
	'models/Entry'
], function ($, _, Backbone, Entry) {

	return Backbone.Collection.extend({
		model: Entry,
		url: '/js/app/data/entries.json',

		getUnviewedEntryID: function() {
			var unviewedEntries = this.where({ viewed : false });

			if (unviewedEntries.length > 0) {
				return _.sample(unviewedEntries).get("id");
			} else {

				this.each(function(model){
					model.set("viewed", false);
				});

				return this.sample().get("id");
			}

		}

	});

});