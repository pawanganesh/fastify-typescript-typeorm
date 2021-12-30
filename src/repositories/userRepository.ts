import { EntityRepository, getCustomRepository, Repository } from "typeorm";

import { User } from "../entities/user.entity";

@EntityRepository(User)
export class UserRespository extends Repository<User> {
  getUserByEmail = async (email: string) => {
    return await this.findOne({ email });
  };

  getUserById = async (id: number) => {
    return await this.findOne({ id });
  };
}
