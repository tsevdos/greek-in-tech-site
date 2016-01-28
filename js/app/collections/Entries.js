import Backbone from 'backbone';
import _ from 'underscore';
import Entry from '../models/Entry';

class Entries extends Backbone.Collection {

	constructor(entries) {
		super(entries);
		this.model = Entry;
	}

	getUnviewedEntryID() {
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

}

export default Entries;
