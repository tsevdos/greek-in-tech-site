import Backbone from 'backbone';
import AppRouter from './router/AppRouter';
import '../scss/main';

new AppRouter();
Backbone.history.start();
