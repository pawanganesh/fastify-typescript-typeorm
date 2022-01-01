import fastify, { FastifyPluginCallback } from "fastify";

import RoleCheckPlugin from "../plugins/role.plugin";
import { getUserSchema } from "../controllers/userController.schema";
import { getUserProfile } from "../controllers/userController";

export const UserRouter: FastifyPluginCallback = async (fastify) => {
  //Initial check for logged in users, drop request without serialization
  fastify.register(RoleCheckPlugin, { loggedOutOnly: false });

  // Get User Profile
  fastify.get("/", { schema: getUserSchema }, getUserProfile);
};
