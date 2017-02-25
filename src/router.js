class RouteConfig {

  constructor(routes) {
    this._routes = routes;
  }

  get routes() {
    return this._routes;
  }

  set routes(routes) {
    this._routes = routes;
  }
}
