require('../scss/main.scss');
import Backbone from 'backbone';
import AppRouter from './router/AppRouter';

new AppRouter(); // eslint-disable-line no-new
Backbone.history.start();
