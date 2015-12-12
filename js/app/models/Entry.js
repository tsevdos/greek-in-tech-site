define([
	'backbone'
], function () {

	return Backbone.Model.extend({

		validate: function(attrs){
			console.log(attrs);
			if (!attrs || attrs.title === '' || attrs.description === '') {
				return "The model must have a title and a description.";
			}
		},

		urlFriendlyTitle: function() {
			var title = this.get('title');
			return this.convertToSlug(title);
		},

		// http://stackoverflow.com/questions/1053902/how-to-convert-a-title-to-a-url-slug-in-jquery#answer-1054862
		convertToSlug: function(text) {
			return text
				.toLowerCase()
				.replace(/[^\w ]+/g,'')
				.replace(/ +/g,'-');
		}
	});

});
