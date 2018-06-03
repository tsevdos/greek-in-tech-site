import Backbone from 'backbone';

class LoaderView extends Backbone.View {
	constructor() {
		super({
			el: '.loader'
		});
	}

	initialize() {
		this.listenTo(this, 'hide', () => this.$el.hide());
	}
}

export default LoaderView;
