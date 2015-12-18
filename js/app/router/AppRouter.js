define([
	'collections/Entries',
	'models/Entry',
	'views/EntriesView',
	'views/LoaderView',
	'views/EntryView',
	'text!data/entries.json',
	'backbone'
], function(Entries, EntryModel, EntriesView, LoaderView, EntryView, data) {

	return Backbone.Router.extend({
		loader: new LoaderView(),
		routes: {
			'': 'showRandomEntry',
			'entry/:id(/:title)': 'showEntry'
		},

		initialize: function() {
			this.loader.render();
			this.entriesData = JSON.parse(data);
			this.entries = new Entries(this.entriesData);
			var entriesView = new EntriesView({ collection: this.entries });
			this.listenTo(entriesView, 'routeToUnviewedEntry', this.showEntry);
		},

		showRandomEntry: function() {
			this.loader.trigger('hide');
			var randomEntryID = this.entries.getUnviewedEntryID();
			this.navigate("entry/" + randomEntryID, { trigger: true });
		},

		showEntry: function(id) {
			this.loader.trigger('hide');
			var entry = this.entries.findWhere({ id : parseInt(id) });
			this.navigate("entry/" + id + "/" +
				entry.urlFriendlyTitle(), { trigger: true });
			new EntryView({ model : entry }).render();
		}

	});

});
