import { get, post, put, del, all, use, route } from "./HTTPVerbs.js";
import { handleRequest } from "./handleRequest.js";

const prototype = {
  get,
  use,
  post,
  put,
  delete: del,
  all,
  route,
  handleRequest,
};
// this Factory function is used to create a new Router object
// a Router object is used to store the routes, controllers and middlewares
// it is also used to create subRoutes
export const Router = () => {
  const router = Object.create({ ...prototype, Router });
  router.handlersArray = [];
  router.prefix = "";
  return router;
};
