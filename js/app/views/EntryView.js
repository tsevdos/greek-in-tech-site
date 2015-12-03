define([
	'text!templates/entry.html',
	'backbone'
], function(EntryTemplate){
	return Backbone.View.extend({
		el: $('#entry'),
		template: _.template(EntryTemplate),

		render: function() {
			this.model.set("viewed", true);
			this.$el.html(this.template(this.model.toJSON()));

			return this;
		}

	});
});
