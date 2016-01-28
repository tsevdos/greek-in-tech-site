import Backbone from 'backbone'
import $ from 'jquery'
import _ from 'underscore'
import Hammer from 'hammerjs'
import EntryView from './EntryView'

class EntriesView extends Backbone.View {

	constructor(options) {
		super({
			el: 'body',
			collection: options.collection,

			events: {
				'click' : 'renderRandomEntry',
				'keydown' : 'handleKeyboardEvent'
			}
		})
	}

	initialize () {
		//_.bindAll(this, "handleMobileEvent");
		var mc = new Hammer(this.$el.get(0));
		mc.on('swiperight swipeleft', this.handleMobileEvent);
	}

	renderRandomEntry(e) {
		// TODO find a better way to suppress event delegation
		if (e && $(e.target).is('a')) {
			return;
		}
		var unviewedEntryID = this.collection.getUnviewedEntryID();
		this.trigger('routeToUnviewedEntry', unviewedEntryID);
	}

	handleKeyboardEvent(e) {
		e.preventDefault();

		// http://www.javascriptkeycode.com/
		var backKeys = [37, 72],
			forwardKeys = [39, 76],
			space = [32];

		if (!_.contains(_.union(backKeys, forwardKeys, space), e.keyCode)){
			return;
		}

		var isForward = _.contains(forwardKeys, e.keyCode) || (space == e.keyCode && !e.shiftKey);
		this.moveToEntry(isForward);
	}

	handleMobileEvent(e) {
		e.preventDefault();

		var isForward = e.type == "swipeleft";
		this.moveToEntry(isForward);
	}

	moveToEntry(isForward) {
		isForward ? this.renderRandomEntry() : this.trigger('navigateBackwards');
	}

}

export default EntriesView
