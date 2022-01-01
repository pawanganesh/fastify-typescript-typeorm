import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

import { IBody, IRegisterBody } from "../interfaces/user.interface";
import { getUserWithPasswordByEmail } from "./userService";

import { userRepository } from "../repositories/userRepository";
import { sendGridMail } from "../helpers/mail-notification";
const SALT_ROUND = 9;

export const createToken = (id: number, email: string) => {
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET!, {
    algorithm: "HS256",
    expiresIn: "24h",
  });
  return token;
};

export const createUser = async (user: IRegisterBody) => {
  user.password = await hash(user.password, SALT_ROUND);
  const { password, ...savedUser } = await userRepository().save(user);
  // TODO: send verification email
  const token = createToken(savedUser.id, savedUser.email);
  await sendGridMail(
    user.email,
    `Please verify your account`,
    `Please click on this link to verify ${process.env.FRONTEND_URL}/verify?token=${token}`
  );
  return savedUser;
};

export const loginUser = async (payload: IBody) => {
  const user = await getUserWithPasswordByEmail(payload.email);
  if (!user) {
    // return reply.code(401).send({ message: "Invalid email or password" });
    return new Error("Invalid email or password");
  }

  const isPasswordValid = await compare(payload.password, user.password);
  if (!isPasswordValid) {
    // return reply.code(401).send({ message: "Invalid email or password" });
    return new Error("Invalid email or password");
  }
  const access_token = createToken(user.id, user.email);
  return { access_token };
};
