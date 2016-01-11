define([
	'backbone',
	'jquery',
	'../collections/Entries',
	'../models/Entry',
	'../views/EntriesView',
	'../views/LoaderView',
	'../views/EntryView',
	'../data/entries.json'
], function(Backbone, $, Entries, EntryModel, EntriesView, LoaderView, EntryView, data) {

	return Backbone.Router.extend({
		loader: new LoaderView(),
		initialFragment: null,
		routes: {
			'': 'showRandomEntry',
			'entry/:id(/:title)': 'showEntry'
		},

		initialize: function() {
			this.$entryEl = $('#entry');
			this.loader.render();
			this.entriesData = JSON.parse(data);
			this.entries = new Entries(this.entriesData);
			var entriesView = new EntriesView({ collection: this.entries });
			this.listenTo(entriesView, 'routeToUnviewedEntry', this.showEntry);
			this.listenTo(entriesView, 'navigateBackwards', this.navigateBackwards);
		},

		showRandomEntry: function() {
			var randomEntryID = this.entries.getUnviewedEntryID();
			this.showEntry(randomEntryID);
		},

		showEntry: function(id) {
			if (this.loader.$el.is(':visible')) {
				this.loader.trigger('hide');
			}

			var entry = this.entries.findWhere({ id : parseInt(id) });
			if (!entry) {
				this.showRandomEntry();
				return;
			}

			this.navigate("entry/" + id + "/" +
				entry.get('urlFriendlyTitle'), { trigger: true });
			if (!this.initialFragment) {
				this.initialFragment = Backbone.history.getFragment();
			}

			new EntryView({ model : entry, container : this.$entryEl }).render();
		},

		navigateBackwards: function() {
			if (this.initialFragment == Backbone.history.getFragment()) {
				return;
			}
			window.history.back();
		}

	});

});
