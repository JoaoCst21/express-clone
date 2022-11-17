export const match = (route, url) => url.match(route)?.at(0) === url;

export const matchMiddleware = (route, url) => {
  try {
    const [match] = url.match(route);
    const str = url.split(match)[1];
    return str === "" || str.startsWith("/");
  } catch (error) {
    return false;
  }
};
