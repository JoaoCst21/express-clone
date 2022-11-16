import { createObjectParams, replaceParams } from "./handleParams.js";

const match = (url, regex) => {
  return url.match(regex)[0] === url;
};

const options = {
  function: (iterator, req, res, next, value) => {
    const { isRegex, params, controller, route, METHOD } = !value
      ? iterator.next().value
      : value;
    let actualRoute = route;
    if (req.method !== METHOD && METHOD !== "ALL" && METHOD !== "USE") {
      next(iterator, req, res);
      return;
    }
    if (params.length) {
      const arrUrl = req.url.split("/").slice(1);
      const arrDirectories = route.split("/").slice(1);
      if (arrDirectories.length !== arrUrl.length) {
        next(iterator, req, res);
        return;
      }
      actualRoute = replaceParams(arrDirectories, arrUrl);
      if (actualRoute !== req.url && !isRegex) {
        next(iterator, req, res);
        return;
      }
      req.params = createObjectParams(arrDirectories, arrUrl, params);
    }
    if (METHOD === "USE" && req.url.startsWith(req.url.match(actualRoute)[0])) {
      controller(req, res, () => next(iterator, req, res));
      return;
    }
    if (METHOD === "USE") return;
    if (isRegex ? match(req.url, actualRoute) : actualRoute === req.url) {
      controller(req, res, () => next(iterator, req, res));
      return;
    }
    req.params = {};
    next(iterator, req, res);
  },
  object: (iterator, req, res, next, value) => {
    const { isRegex, params, controller, route } = !value
      ? iterator.next().value
      : value;
    let actualRoute = route;
    if (params) {
      const arrUrl = req.url.split("/").slice(1);
      const arrDirectories = route.split("/").slice(1);
      if (arrDirectories.length !== arrUrl.length) {
        next(iterator, req, res);
        return;
      }
      actualRoute = replaceParams(arrDirectories, arrUrl);
      if (actualRoute !== req.url && !isRegex) {
        next(iterator, req, res);
        return;
      }
      req.params = createObjectParams(arrDirectories, arrUrl, params);
    }
    if (req.url.startsWith(req.url.match(actualRoute)[0])) {
      handleRequest.call(controller, req, res, () => next(iterator, req, res));
      return;
    }
    req.params = {};
    next(iterator, req, res);
  },
};

// const next = (iterator, req, res) => {
//   // const handler = iterator.next().value;
//   // const { controller } = handler;
//   // options[typeof controller](handler, iterator, req, res);
//   const { isRegex, params, controller, route, METHOD } = iterator.next().value;
//   let actualRoute = route;
//   if (METHOD === "USE" && req.url.startsWith(route)) {
//     controller(req, res, () => next(iterator, req, res));
//     return;
//   }
//   if (req.method !== METHOD && METHOD !== "ALL") {
//     next(iterator, req, res);
//     return;
//   }
//   if (params) {
//     const arrUrl = req.url.split("/").slice(1);
//     const arrDirectories = route.split("/").slice(1);
//     if (arrDirectories.length !== arrUrl.length) {
//       next(iterator, req, res);
//       return;
//     }
//     actualRoute = replaceParams(arrDirectories, arrUrl);
//     if (actualRoute !== req.url && !isRegex) {
//       next(iterator, req, res);
//       return;
//     }
//     req.params = createObjectParams(arrDirectories, arrUrl, params);
//   }
//   if (isRegex ? match(req.url, actualRoute) : actualRoute === req.url) {
//     controller(req, res, () => next(iterator, req, res));
//   }
//   req.params = {};
// };

// export const handleRequest = function (req, res) {
//   console.log(this);
//   const iterator = this.handlersArray.values();
//   next(iterator, req, res);
// };

export function handleRequest(req, res, nextMiddleware) {
  const iterator = this.handlersArray.values();
  const next = (iterator, req, res) => {
    const { done, value } = iterator.next();
    if (done && nextMiddleware) {
      nextMiddleware();
      return;
    }
    if (done) throw new Error("No route found");
    const { controller } = value;
    options[typeof controller](iterator, req, res, next, value);
    // handle request
  };
  next(iterator, req, res);
}
