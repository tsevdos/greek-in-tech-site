define([
	'backbone'
], function () {

	return Backbone.Model.extend({

		initialize: function() {
			this.set({ viewed : false });
			this.set({ urlFriendlyTitle : this.convertToSlug(this.get('title'))});
			this.parseTitle();
		},

		validate: function(attrs){
			console.log(attrs);
			if (!attrs || attrs.title === '' || attrs.description === '') {
				return "The model must have a title and a description.";
			}
		},

		parseTitle: function(){
			if (this.titleContainsParenthesis(this.get('title'))){
				this.set('title', this.wrapTitleParenthesisInSpans(this.get('title')));
			}
		},

		// http://stackoverflow.com/questions/1053902/how-to-convert-a-title-to-a-url-slug-in-jquery#answer-1054862
		convertToSlug: function(text) {
			return text
				.toLowerCase()
				.replace(/[^\w ]+/g,'')
				.replace(/ +/g,'-');
		},

		titleContainsParenthesis: function(title) {
			if (title.indexOf('(') > -1 || title.indexOf(')') > -1){
				return true;
			}

			return false;
		},

		wrapTitleParenthesisInSpans: function(title) {
			return title.replace('(', '<span>(').replace(')', ')</span>');
		}

	});

});
