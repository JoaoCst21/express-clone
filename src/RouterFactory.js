import { get, use, post, put, del, all, route } from "./HTTPVerbs.js";
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

export function Router() {
  const router = Object.create({ ...prototype, Router });
  router.arrayMiddlewares = [];
  router.prefix = "";
  return router;
}
