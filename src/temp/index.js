const get = (route, controller, next) => {
  this.array.push((req, res) => {
    if (req.method !== "GET") {
      next();
      return;
    }
  });
};
