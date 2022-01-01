import { userRepository } from "../repositories/userRepository";

export const getUserById = async (id: number) => {
  return await userRepository().findOne({ id });
};

export const getUserByEmail = async (email: string) => {
  return await userRepository().findOne({ email });
};

export const getUserByEmailAndId = async (email: string, id: number) => {
  return await userRepository().findOne({ email, id });
};

export const getUserWithPasswordByEmail = async (email: string) => {
  return await userRepository().getUserWithPasswordByEmail(email);
};
