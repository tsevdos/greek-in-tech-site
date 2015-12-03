define([
	'text!templates/entry.html',
	'backbone'
], function(EntryTemplate){
	return Backbone.View.extend({
		el: $('#entry'),
		template: _.template(EntryTemplate),

		events: {
			'click .twitter-share-button' : "tweetEntry"
		},

		render: function() {
			this.model.set("viewed", true);
			this.$el.html(this.template(this.model.toJSON()));

			return this;
		},

		tweetEntry: function(e) {
			e.preventDefault();

			var width  = 575,
				height = 400,
				left   = ($(window).width()  - width)  / 2,
				top    = ($(window).height() - height) / 2,
				url    = this.$el.find('.twitter-share-button').attr('href'),
				opts   = 'status=1' +
						',width='  + width  +
						',height=' + height +
						',top='    + top    +
						',left='   + left;

			window.open(url, 'twitter', opts);
		}

	});
});
