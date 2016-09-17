import Backbone from 'backbone';
import AppRouter from './router/AppRouter';
import '../scss/main.scss';

new AppRouter(); // eslint-disable-line no-new
Backbone.history.start();
