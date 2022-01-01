import { EntityRepository, getCustomRepository, Repository } from "typeorm";

import { User } from "../entities/user.entity";

@EntityRepository(User)
export class UserRespository extends Repository<User> {
  getUserWithPasswordByEmail = async (email: string) => {
    return await this.createQueryBuilder("users")
      .select("users.id")
      .addSelect("users.password")
      .where("users.email=:email", { email })
      .getOne();
  };
}

export const userRepository = () => {
  return getCustomRepository(UserRespository);
};
