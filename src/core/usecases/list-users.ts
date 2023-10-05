import { User } from "../entities/user";
import { UserRepository } from "../repositories/UserRepository";

class ListUsers {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(page: number, perPage: number): Promise<User[]> {
    const users = await this.userRepository.paginate(page, perPage);

    return users;
  }
}

export { ListUsers };
