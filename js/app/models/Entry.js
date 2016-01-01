define([
	'backbone'
], function () {

	return Backbone.Model.extend({

		initialize: function() {
			this.set({ viewed : false });
			this.set({ urlFriendlyTitle : this.convertToSlug(this.get('title'))});
		},

		validate: function(attrs){
			console.log(attrs);
			if (!attrs || attrs.title === '' || attrs.description === '') {
				return "The model must have a title and a description.";
			}
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
