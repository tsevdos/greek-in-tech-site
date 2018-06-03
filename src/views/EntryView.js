import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import EntryTemplate from '../templates/entry';

class EntryView extends Backbone.View {
	constructor(options) {
		super({
			el: '#entry',
			model: options.model,
			container: options.container,

			events: {
				'click .social-links a': 'socialShare'
			}
		});
		this.template = _.template(EntryTemplate);
	}

	initialize(options) {
		this.listenTo(this.model, 'change', this.render);
		this.CSSanimationClasses = 'flipInX animated';
		this.container = options.container;
		this.animateView();
	}

	render() {
		this.model.set('viewed', true);
		this.$el.html(this.template(this.model.toJSON()));

		return this;
	}

	animateView() {
		this.container.addClass(this.CSSanimationClasses);
	}

	socialShare(e) {
		e.preventDefault();

		const width = 575;
		const height = 400;
		const left = ($(window).width() - width) / 2;
		const top = ($(window).height() - height) / 2;
		const url = $(e.target).attr('href');
		const opts = `status=1,width=${width},height=${height},top=${top},left=${left}`;

		window.open(url, 'Share', opts);
	}
}

export default EntryView;
