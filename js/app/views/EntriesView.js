define([
	'backbone',
	'jquery',
	'underscore',
	'./EntryView',
	'hammerjs',
], function(Backbone, $, _, EntryView, Hammer){
	return Backbone.View.extend({
		el: $('body'),
		events: {
			'click' : 'renderRandomEntry',
			'keydown' : 'handleKeyboardEvent'
		},

		initialize: function(options) {
			this.collection = options.collection;

			_.bindAll(this, "handleMobileEvent");
			var mc = new Hammer(this.$el.get(0));
			mc.on('swiperight swipeleft', this.handleMobileEvent);
		},

		renderRandomEntry: function(e) {
			// TODO find a better way to suppress event delegation
			if (e && $(e.target).is('a')) {
				return;
			}
			var unviewedEntryID = this.collection.getUnviewedEntryID();
			this.trigger('routeToUnviewedEntry', unviewedEntryID);
		},

		handleKeyboardEvent: function(e) {
			// http://www.javascriptkeycode.com/
			var backKeys = [37, 72], forwardKeys = [39, 76], space = [32];

			if (!_.contains(_.union(backKeys, forwardKeys, space), e.keyCode)){
				return;
			}

			var isForward = _.contains(forwardKeys, e.keyCode) ||
				(space == e.keyCode && !e.shiftKey);
			this.moveToEntry(isForward);
			e.preventDefault();
		},

		handleMobileEvent: function(e) {
			var isForward = e.type == "swipeleft";
			this.moveToEntry(isForward);
			e.preventDefault();
		},

		moveToEntry: function(isForward) {
			isForward ? this.renderRandomEntry() :
				this.trigger('navigateBackwards');
		},
	});
});
