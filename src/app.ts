import Fastify, { FastifyServerOptions } from "fastify";

import "reflect-metadata";
import connectDB from "./plugins/db.plugin";

import { AuthRouter } from "./routes/authRouter";
import { UserRouter } from "./routes/userRouter";
import { Handler404 } from "./helpers/replies";

const app = (opts: FastifyServerOptions = {}) => {
  const server = Fastify(opts);
  server.register(connectDB);
  server.setNotFoundHandler(Handler404);

  // Swagger docs
  server.register(require("fastify-swagger"), {
    exposeRoute: true,
    routePrefix: "/docs",
    swagger: {
      info: {
        title: "Project Title",
        description: "Project description",
        version: "1.0.0",
      },
    },
  });

  // test ping/pong
  server.get("/ping", async (request, reply) => {
    return "pong";
  });

  server.register(AuthRouter, { prefix: "/auth" });
  server.register(UserRouter, { prefix: "/user" });

  return server;
};

export default app;
