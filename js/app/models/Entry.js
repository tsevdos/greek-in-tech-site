import Backbone from 'backbone';

class Entry extends Backbone.Model {

	constructor(attributes) {
		super(attributes);
		this.set({ urlFriendlyTitle : this.convertToSlug(this.get('title')) });
		this.parseTitle();
	}

	defaults() {
		return {
			viewed: false
		};
	}

	validate(attrs) {
		console.log(attrs);
		if (!attrs || attrs.title === '' || attrs.description === '') {
			return "The model must have a title and a description.";
		}
	}

	parseTitle(){
		if (this.titleContainsParenthesis(this.get('title'))){
			this.set('title', this.wrapTitleParenthesisInSpans(this.get('title')));
		}
	}

	convertToSlug(text) {
		return text
			.toLowerCase()
			.replace(/[^\w ]+/g,'')
			.replace(/ +/g,'-');
	}

	titleContainsParenthesis(title) {
		if (title.indexOf('(') > -1 || title.indexOf(')') > -1){
			return true;
		}

		return false;
	}

	wrapTitleParenthesisInSpans(title) {
		return title.replace('(', '<span>(').replace(')', ')</span>');
	}

}

export default Entry;
