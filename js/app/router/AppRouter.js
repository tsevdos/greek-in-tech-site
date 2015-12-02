define([
	'jquery',
	'underscore',
	'backbone',
	'collections/Entries',
	'models/Entry',
	'views/EntriesView',
	'views/EntryView',
	'text!data/entries.json'
], function($, _, Backbone, Entries, EntryModel, EntriesView, EntryView, data) {

	return Backbone.Router.extend({
		routes: {
			'auto(/)(:duration)': 'showAuto',
			'entry/:id(/)(:duration)': 'showEntry',
			'*default': 'showDefault'
		},

		initialize: function() {
			this.entriesData = JSON.parse(data);
			this.entries = new Entries(this.entriesData);
			this.timeoutID = null;
			var entriesView = new EntriesView({ collection: this.entries });
			this.listenTo(entriesView, 'routeToUnviewedEntry', this.showEntry)
		},

		showDefault: function() {
			this.stopAuto();
			var randomEntryID = this.entries.getUnviewedEntryID();
			this.navigate("entry/" + randomEntryID, { trigger: true });
		},

		showAuto: function(duration) {
			duration = duration ? duration : 30;
			var randomEntryID = this.entries.getUnviewedEntryID();
			this.navigate("entry/" + randomEntryID + "/" + duration, { trigger: true });
		},

		showEntry: function(id, duration) {
			var entry = this.entries.findWhere({ id : parseInt(id) });
			new EntryView({ model : entry }).render();

			if(duration){
				this.enableAuto(duration);
			} else {
				this.stopAuto();
			}
		},

		enableAuto: function(duration){
			var _this = this
			this.timeoutID = setTimeout(function(){
				var randomEntryID = _this.entries.getUnviewedEntryID();
				_this.navigate("entry/" + randomEntryID + "/" + duration, { trigger: true });
			}, duration * 1000);
		},

		stopAuto: function(){
			clearTimeout(this.timeoutID);
			this.timeoutID = null;
		}

	});

});
