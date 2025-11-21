class Router {
  constructor(store) {
    this.store = store;
    this.routes = {
      '': 'home',
      'lessons': 'lessons',
      'lesson': 'lesson',
      'quiz': 'quiz',
      'suggest': 'suggest'
    };
    window.addEventListener('hashchange', () => this.handleRouteChange());
    this.handleRouteChange();
  }

  handleRouteChange() {
    const hash = window.location.hash.substring(1);
    const [route, param] = hash.split('/');
    const viewName = this.routes[route] || 'home';
    this.store.setState({ 
      currentView: viewName,
      currentParam: param || null
    });
  }

  navigateTo(route, param = '') {
    const hash = param ? `#${route}/${param}` : `#${route}`;
    window.location.hash = hash;
  }
}

export default Router;
