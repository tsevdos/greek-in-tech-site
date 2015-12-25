define([
	'views/EntryView',
	'backbone'
], function(EntryView){
	return Backbone.View.extend({
		el: $('body'),
		events: {
			'click' : 'renderRandomEntry',
			'keydown' : 'handleKeyboardEvent'
		},

		initialize: function(options) {
			this.collection = options.collection;
		},

		renderRandomEntry: function(e) {
			// TODO find a better way to suppress event delegation
			if (e && $(e.target).is('a')) {
				return;
			}
			var unviewedEntryID = this.collection.getUnviewedEntryID();
			this.trigger('routeToUnviewedEntry', unviewedEntryID);
		},

		handleKeyboardEvent: function(e, b) {
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

		moveToEntry: function(isForward) {
			isForward ? this.renderRandomEntry() :
				this.trigger('navigateBackwards');
		},
	});
});
