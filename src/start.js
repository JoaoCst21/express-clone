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
export const Router = () => {
  const router = Object.create({ ...prototype, Router });
  router.handlersArray = [];
  router.prefix = "";
  return router;
};
