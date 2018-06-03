import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import { all as entries } from 'greek-in-tech';
import LoaderView from '../views/LoaderView';
import Entries from '../collections/Entries';
import EntriesView from '../views/EntriesView';
import EntryView from '../views/EntryView';

class AppRouter extends Backbone.Router {
	constructor() {
		super();
		this.routes = {
			'entry/:id(/:title)': 'showEntry',
			'*actions': 'showRandomEntry'
		};
		this._bindRoutes();
	}

	initialize() {
		this.initialFragment = null;
		this.$entryEl = $('#entry');
		this.loader = new LoaderView();
		this.entries = new Entries(JSON.parse(entries));
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

		const entry = this.entries.findWhere({ id: parseInt(id, 10) });

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
