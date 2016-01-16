import Backbone from 'backbone';
import AppRouter from './router/AppRouter';

var initialize = function() {
  var appRouter = new AppRouter();

  Backbone.history.start();
};

module.exports = {
  init: initialize
};
