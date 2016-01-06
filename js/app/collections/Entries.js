define([
	'models/Entry',
	'backbone'
], function (Entry) {

	return Backbone.Collection.extend({
		model: Entry,

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
