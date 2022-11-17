import http from "http";
import { Router } from "./RouterFactory.js";

const express = () => {
  let router = Router();
  const server = http.createServer((req, res) => {
    router.handleRequest(req, res);
  });
  const prototype = Object.getPrototypeOf(server);
  Object.setPrototypeOf(Object.getPrototypeOf(router), prototype);
  return Object.setPrototypeOf(
    { ...server, ...router },
    Object.getPrototypeOf(router)
  );
};

export default express;
