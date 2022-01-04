import { RouteHandler } from "fastify";
import { createUser } from "../services/authService";
import { IBody, IRegisterBody } from "../interfaces/user.interface";
import { getUserByEmail } from "../services/userService";
import { loginUser } from "../services/authService";

const userLoginController: RouteHandler<{ Body: IBody }> = async (
  request,
  reply
) => {
  return loginUser(request.body, reply);
};

const emailExistsHandler: RouteHandler<{ Body: IRegisterBody }> = async (
  request,
  reply
) => {
  const user = await getUserByEmail(request.body.email);
  if (user) {
    return reply.code(400).send({ message: "Email already exists!" });
  }
};

const userRegisterController: RouteHandler<{ Body: IRegisterBody }> = async (
  request,
  reply
) => {
  return await createUser(request.body);
};

const userVerificationController: RouteHandler = async (request, reply) => {};

export {
  emailExistsHandler,
  userRegisterController,
  userLoginController,
  userVerificationController,
};
