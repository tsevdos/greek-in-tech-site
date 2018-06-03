import Backbone from 'backbone';
import _ from 'underscore';
import Entry from '../models/Entry';

class Entries extends Backbone.Collection {
	initialize() {
		this.model = Entry;
	}

	getUnviewedEntryID() {
		const unviewedEntries = this.where({ viewed: false });

		if (unviewedEntries.length > 0) {
			return _.sample(unviewedEntries).get('id');
		}

		this.each(model => model.set('viewed', false));
		return this.sample().get('id');
	}
}

export default Entries;
