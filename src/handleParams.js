export const separateParams = (route) => {
  // make regex to match params
  const regex = /:([a-zA-Z0-9]+)/g;
  return [...route.matchAll(regex)].map((match) => match[1]) || [];
};

export const createObjectParams = (arrDirectories, arrUrl, params) => {
  const objParams = {};
  params.forEach((param) => {
    const index = arrDirectories.findIndex((directory) =>
      directory.startsWith(":")
    );
    objParams[param] = arrUrl[index];
  });
  return objParams;
};

export const replaceParams = (arrDirectories, arrUrl) => {
  return arrDirectories.reduce((acc, directory, index) => {
    if (directory.startsWith(":")) {
      return acc + `/${arrUrl[index]}`;
    }
    return acc + `/${directory}`;
  }, "");
};
