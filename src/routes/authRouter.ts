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

export const AuthRouter: FastifyPluginCallback = async (fastify) => {
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
