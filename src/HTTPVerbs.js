import { separateParams } from "./handleParams.js";
import { checkRouteIsRegex } from "./checkIfRegex.js";
import { handleRequest } from "./handleRequest.js";
import { Router } from "./start.js";

const HTTPVerbFactory = (METHOD) =>
  function (route, controller) {
    if (typeof controller === "object") {
      if (METHOD !== "USE") throw new Error("Invalid use of route");
      const isRegex = checkRouteIsRegex(this.prefix + route);
      const params = separateParams(this.prefix + route);
      controller.prefix += route;
      this.handlersArray.push({
        isRegex,
        params,
        controller,
        route: this.prefix + route,
        METHOD: "USE",
      });
      return;
    }
    if (typeof route === "function" && !controller) {
      const isRegex = checkRouteIsRegex(this.prefix);
      const params = separateParams(this.prefix);
      this.handlersArray.push({
        isRegex,
        params,
        controller: route,
        route: this.prefix ? this.prefix : "/",
        METHOD,
      });
      return;
    }
    const isRegex = checkRouteIsRegex(this.prefix + route);
    const params = separateParams(this.prefix + route);
    this.handlersArray.push({
      isRegex,
      params,
      controller,
      route: this.prefix + route,
      METHOD: METHOD,
    });
  };
const get = HTTPVerbFactory("GET");
const post = HTTPVerbFactory("POST");
const put = HTTPVerbFactory("PUT");
const del = HTTPVerbFactory("DELETE");
const all = HTTPVerbFactory("ALL");
const use = HTTPVerbFactory("USE");

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

export { get, use, post, put, del, all, route };
