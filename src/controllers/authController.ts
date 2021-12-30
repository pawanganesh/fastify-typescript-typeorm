import { RouteHandler } from "fastify";
import { getCustomRepository } from "typeorm";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

import { UserRespository } from "../repositories/userRepository";

const SALT_ROUND = 9;

export interface IBody {
  email: string;
  password: string;
}

export interface IRegisterBody extends IBody {
  full_name: string;
}

export const userLoginController: RouteHandler<{ Body: IBody }> = async (
  request,
  reply
) => {
  const userRepository = getCustomRepository(UserRespository);
  const user = await userRepository.getUserByEmail(request.body.email);
  if (!user) {
    return reply.code(401).send({ message: "Invalid email or password" });
  }

  const isPasswordValid = await compare(request.body.password, user.password);
  if (!isPasswordValid) {
    return reply.code(401).send({ message: "Invalid email or password" });
  }
  const access_token = jwt.sign(
    { email: user.email, id: user.id },
    process.env.JWT_SECRET!
  );
  return { access_token };
};

export const emailExistsHandler: RouteHandler<{ Body: IRegisterBody }> = async (
  request,
  reply
) => {
  const userRepository = getCustomRepository(UserRespository);
  const user = await userRepository.getUserByEmail(request.body.email);
  if (user) {
    return reply.code(400).send({ message: "Email already exists!" });
  }
};

export const userRegisterController: RouteHandler<{ Body: IRegisterBody }> =
  async (request, reply) => {
    const userRepository = getCustomRepository(UserRespository);
    const user = { ...request.body };
    user.password = await hash(user.password, SALT_ROUND);
    const { password, ...savedUser } = await userRepository.save(user);
    return savedUser;
  };

export default {
  emailExistsHandler,
  userRegisterController,
  userLoginController,
};
