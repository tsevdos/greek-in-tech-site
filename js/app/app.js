import Backbone from 'backbone';
import AppRouter from './router/AppRouter';

export default function () {
	new AppRouter();
	Backbone.history.start();
}
