const regexIdentifiers = ["*", "(", ")", "?", "+"];
export const checkRouteIsRegex = (route) => {
  return regexIdentifiers.some((regexIdentifier) =>
    route.includes(regexIdentifier)
  );
};
