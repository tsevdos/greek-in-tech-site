import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Hammer from 'hammerjs';

class EntriesView extends Backbone.View {
	constructor(options) {
		super({
			el: 'body',
			collection: options.collection,

			events: {
				click: 'renderRandomEntry',
				keydown: 'handleKeyboardEvent'
			}
		});
	}

	initialize() {
		const mc = new Hammer(this.$el.get(0));
		mc.on('swiperight swipeleft', this.handleMobileEvent);
	}

	renderRandomEntry(e) {
		if (e && $(e.target).is('a')) {
			return;
		}
		const unviewedEntryID = this.collection.getUnviewedEntryID();
		this.trigger('routeToUnviewedEntry', unviewedEntryID);
	}

	handleKeyboardEvent(e) {
		e.preventDefault();

		const backKeys = [37, 72];
		const forwardKeys = [39, 76];
		const space = [32];

		if (!_.contains(_.union(backKeys, forwardKeys, space), e.keyCode)) {
			return;
		}

		const isForward = _.contains(forwardKeys, e.keyCode) || (space === e.keyCode && !e.shiftKey);
		this.moveToEntry(isForward);
	}

	handleMobileEvent(e) {
		e.preventDefault();

		const isForward = e.type === 'swipeleft';
		this.moveToEntry(isForward);
	}

	moveToEntry(isForward) {
		isForward ? this.renderRandomEntry() : this.trigger('navigateBackwards');
	}
}

export default EntriesView;
