define([
	'collections/Entries',
	'models/Entry',
	'views/EntriesView',
	'views/EntryView',
	'text!data/entries.json',
	'backbone'
], function(Entries, EntryModel, EntriesView, EntryView, data) {

	return Backbone.Router.extend({
		routes: {
			'': 'showRandomEntry',
			'entry/:id': 'showEntry'
		},

		initialize: function() {
			this.entriesData = JSON.parse(data);
			this.entries = new Entries(this.entriesData);
			var entriesView = new EntriesView({ collection: this.entries });
			this.listenTo(entriesView, 'routeToUnviewedEntry', this.showEntry);
		},

		showRandomEntry: function() {
			var randomEntryID = this.entries.getUnviewedEntryID();
			this.navigate("entry/" + randomEntryID, { trigger: true });
		},

		showEntry: function(id) {
			var entry = this.entries.findWhere({ id : parseInt(id) });
			new EntryView({ model : entry }).render();
		}

	});

});
