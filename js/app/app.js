import Backbone from 'backbone'
import AppRouter from './router/AppRouter'

class App {

  constructor () {
    new AppRouter();
    Backbone.history.start();
  }

}

export default App;
