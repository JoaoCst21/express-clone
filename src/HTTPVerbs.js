const getParams = (route) => {
  // make regex to match params
  const regex = /:([a-zA-Z0-9]+)/g;
  return [...route.matchAll(regex)].map((match) => match[1]) || [];
};

const HTTPVerbsFactory = (method) =>
  async function (route, controller = "/") {
    if (typeof route === "function") [route, controller] = ["/", route];
    if (!controller) throw new Error("Controller not found");
    if (typeof controller === "object") {
      controller.prefix = this.prefix + route;
      this.arrayMiddlewares.push({
        method,
        controller,
        route: this.prefix + route,
        params: [],
      });
      return;
    }
    const middleware = {
      method,
      route: this.prefix + route,
      controller,
      params: getParams(route),
    };
    this.arrayMiddlewares.push(middleware);
  };

const get = HTTPVerbsFactory("GET");
const post = HTTPVerbsFactory("POST");
const put = HTTPVerbsFactory("PUT");
const del = HTTPVerbsFactory("DELETE");
const all = HTTPVerbsFactory("ALL");
const use = HTTPVerbsFactory("USE");

function route(route) {
  const obj = {
    get: (controller) => {
      get.call(this, route, controller);
      return obj;
    },
    post: (controller) => {
      post.call(this, route, controller);
      return obj;
    },
    put: (controller) => {
      put.call(this, route, controller);
      return obj;
    },
    delete: (controller) => {
      del.call(this, route, controller);
      return obj;
    },
    all: (controller) => {
      all.call(this, route, controller);
      return obj;
    },
    use: (controller) => {
      use.call(this, route, controller);
      return obj;
    },
  };
  return obj;
}

export { get, post, put, del, all, use, route };
