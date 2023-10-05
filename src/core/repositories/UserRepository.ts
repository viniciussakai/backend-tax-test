import { User } from "../entities/user";

interface UserRepository {
  paginate(page: number, perPage: number): Promise<User[]>;
}

export { UserRepository };
