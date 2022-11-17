import handleMiddleware from "./handleMiddlewareArray.js";

export const handleRequest = async function (req, res, nextMiddleware) {
  const iterator = this.arrayMiddlewares.values();
  const next = async (iterator, req, res) => {
    const { value, done } = iterator.next();
    if (done && !nextMiddleware) return;
    if (done) {
      nextMiddleware();
      return;
    }
    await handleMiddleware(value, req, res, () => next(iterator, req, res));
  };
  next(iterator, req, res);
  // await iterator.next().value(req, res, iterator.next);
};
