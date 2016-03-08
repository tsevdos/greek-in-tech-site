import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import LoaderView from '../views/LoaderView';
import Entries from '../collections/Entries';
import EntriesView from '../views/EntriesView';
import EntryView from '../views/EntryView';
import data from '../data/entries.json';

class AppRouter extends Backbone.Router {

	constructor() {
		super();
		this.routes = {
			'entry/:id(/:title)': 'showEntry',
			'*actions': 'showRandomEntry'
		};
		this._bindRoutes();

		this.initialFragment = null;
		this.$entryEl = $('#entry');
		this.loader = new LoaderView();
		this.entriesData = JSON.parse(data);
		this.entries = new Entries();
		// TODO: See if I can do it
		// in one line ex. this.entries = new Entries(this.entriesData);
		this.entries.add(this.entriesData);
		const entriesView = new EntriesView({ collection: this.entries });
		this.listenTo(entriesView, 'routeToUnviewedEntry', this.showEntry);
		this.listenTo(entriesView, 'navigateBackwards', this.navigateBackwards);
	}

	showRandomEntry() {
		const randomEntryID = this.entries.getUnviewedEntryID();
		this.showEntry(randomEntryID);
	}

	showEntry(id) {
		if (this.loader.$el.is(':visible')) {
			this.loader.trigger('hide');
		}

		const entry = this.entries.findWhere({ id: parseInt(id) });

		if (_.isUndefined(entry)) {
			this.showRandomEntry();
			return;
		}

		this.navigate(`entry/${id}/${entry.get('urlFriendlyTitle')}`, { trigger: true });

		if (!this.initialFragment) {
			this.initialFragment = Backbone.history.getFragment();
		}

		this.entryView = new EntryView({ model: entry, container: this.$entryEl }).render();
	}

	navigateBackwards() {
		if (this.initialFragment === Backbone.history.getFragment()) {
			return;
		}
		window.history.back();
	}

}

export default AppRouter;
