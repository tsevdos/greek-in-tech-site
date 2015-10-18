define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {

	return Backbone.Model.extend({

		validate: function(attrs){
			console.log(attrs);
			if (!attrs || attrs.title === '' || attrs.description === '') {
				return "The model must have a title and a description.";
			}
		}

	});

});