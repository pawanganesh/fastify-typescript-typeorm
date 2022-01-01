import { RouteHandler } from "fastify";

import { IUserRequest } from "../interfaces/user.interface";
import { getUserByEmail } from "../services/userService";

const getUserProfile: RouteHandler = async (request, reply) => {
  const { email } = request.user as IUserRequest;
  const user = await getUserByEmail(email);
  return user;
};

export { getUserProfile };
