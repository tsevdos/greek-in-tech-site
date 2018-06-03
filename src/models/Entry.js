import Backbone from 'backbone';

class Entry extends Backbone.Model {
	initialize() {
		this.set({ urlFriendlyTitle: this.convertToSlug(this.get('title')) });
		this.parseTitle();
	}

	defaults() {
		return {
			viewed: false
		};
	}

	parseTitle() {
		if (this.titleContainsParenthesis(this.get('title'))) {
			this.set('title', this.wrapTitleParenthesisInSpans(this.get('title')));
		}
	}

	convertToSlug(text) {
		return text
			.toLowerCase()
			.replace(/[^\w ]+/g, '')
			.replace(/ +/g, '-');
	}

	titleContainsParenthesis(title) {
		if (title.indexOf('(') > -1 || title.indexOf(')') > -1) {
			return true;
		}

		return false;
	}

	wrapTitleParenthesisInSpans(title) {
		return title.replace('(', '<span>(').replace(')', ')</span>');
	}
}

export default Entry;
