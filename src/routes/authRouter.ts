import { FastifyPluginCallback } from "fastify";

import {
  RegisterSchema,
  LoginSchema,
} from "../controllers/authController.schema";
import {
  emailExistsHandler,
  userRegisterController,
  userLoginController,
} from "../controllers/authController";
import RoleCheckPlugin from "../plugins/role.plugin";

export const AuthRouter: FastifyPluginCallback = async (fastify) => {
  //Initial check for logged in users, drop request without serialization
  fastify.register(RoleCheckPlugin, { loggedOutOnly: true });
  
  //POST /auth/register
  fastify.post(
    "/register",
    {
      schema: RegisterSchema,
      preHandler: emailExistsHandler,
    },
    userRegisterController
  );
  //POST /auth/login
  fastify.post("/login", { schema: LoginSchema }, userLoginController);
};
