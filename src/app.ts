import Fastify, { FastifyServerOptions } from "fastify";

import "reflect-metadata";
import connectDB from "./plugins/db.plugin";

import { AuthRouter } from "./routes/authRouter";

const app = (opts: FastifyServerOptions = {}) => {
  const server = Fastify(opts);

  server.register(connectDB);

  // test
  server.get("/ping", async (request, reply) => {
    return "pong";
  });

  server.register(AuthRouter, { prefix: "/auth" });

  return server;
};

export default app;
