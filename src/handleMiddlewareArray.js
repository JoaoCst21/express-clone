import { match, matchMiddleware } from "./matchRoute.js";
import { createParams, replaceParams } from "./handleParams.js";

const handleMiddleware = async function (middleware, req, res, next) {
  const { method, controller, route, params } = middleware;
  let actualRoute = route;
  if (method === "USE") {
    if (typeof controller === "object") {
      if (matchMiddleware(actualRoute, req.url)) {
        await controller.handleRequest(req, res, next);
        return;
      }
    }
    if (params.length) {
      const arrDirectories = route.split("/");
      const arrDirectoriesReq = req.url.split("/");
      actualRoute = replaceParams(arrDirectories, arrDirectoriesReq);
      req.params = createParams(arrDirectories, arrDirectoriesReq);
    }
    if (matchMiddleware(actualRoute, req.url)) {
      await controller(req, res, next);
      return;
    }
    req.params = {};
    next();
    return;
  }
  if (method !== req.method && method !== "ALL") {
    next();
    return;
  }
  if (params.length) {
    const arrDirectories = route.split("/").slice(1);
    const arrDirectoriesReq = req.url.split("/").slice(1);

    // check if the directories length is the same
    if (arrDirectories.length !== arrDirectoriesReq.length) {
      next();
      return;
    }

    actualRoute = replaceParams(arrDirectories, arrDirectoriesReq);
    req.params = createParams(arrDirectories, arrDirectoriesReq);
  }
  if (match(actualRoute, req.url)) {
    await controller(req, res, next);
    return;
  }

  req.params = {};
  next();
};

export default handleMiddleware;
