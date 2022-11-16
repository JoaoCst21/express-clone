const handleController = {
  function: (iterator, req, res, next, value) => {
    const { isRegex, params, controller, route, METHOD } = !value
      ? iterator.next().value
      : value;
    let actualRoute = route;
    if (req.method !== METHOD && METHOD !== "ALL") {
      next(iterator, req, res);
      return;
    }
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
      controller(req, res, () => next(iterator, req, res));
      return;
    }
    req.params = {};
    next(iterator, req, res);
  },
};

const handleRequest = (req, res, nextMiddleware) => {
  const iterator = this.arrayOfHandlers.values();
  const next = (iterator, req, res) => {
    const { done, value } = iterator.next();
    if (done && nextMiddleware) {
      nextMiddleware();
      return;
    }
    const { controller } = value;
    handleController[typeof controller](iterator, req, res, next, value);
    // handle request
  };
  next(iterator, req, res);
};
