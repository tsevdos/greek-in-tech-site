define([
	'backbone',
	'jquery',
	'underscore',
	'../templates/entry.html'
], function(Backbone, $, _, EntryTemplate){
	return Backbone.View.extend({
		el: $('#entry'),
		template: _.template(EntryTemplate),

		events: {
			'click .twitter-share-button' : "tweetEntry"
		},

		initialize: function (options) {
			var self = this;
			this.CSSanimationClasses = "flipInX animated";
			this.container = options.container;
			this.container.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass(self.CSSanimationClasses);
			});
		},

		render: function() {
			this.model.set("viewed", true);
			this.$el.html(this.template(this.model.toJSON()));
			this.animateView();

			return this;
		},

		animateView: function() {
			this.container.addClass(this.CSSanimationClasses);
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
