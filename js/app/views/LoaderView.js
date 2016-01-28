import Backbone from 'backbone'
import $ from 'jquery'

class LoaderView extends Backbone.View {

	constructor() {
		super({
			el: '.loader'
		});
	}

	initialize() {
		this.listenTo(this, 'hide', this.hideLoader);
	}

	hideLoader() {
		this.$el.hide();
	}

}

export default LoaderView;
