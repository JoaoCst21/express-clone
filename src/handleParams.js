export const replaceParams = (arrDirectories, arrUrl) => {
  return arrDirectories.reduce((acc, directory, index) => {
    if (directory.startsWith(":")) {
      return acc + `/${arrUrl[index]}`;
    }
    return acc + `/${directory}`;
  }, "");
};

export const createParams = function (arrDirectories, arrDirectoriesReq) {
  const objParams = {};
  arrDirectories.forEach((directory, index) => {
    if (directory.startsWith(":")) {
      const param = directory.replace(":", "");
      objParams[param] = arrDirectoriesReq[index];
    }
  });
  return objParams;
};
