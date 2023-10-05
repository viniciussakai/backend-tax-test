import { User } from "@/core/entities/user";
import { UserRepository } from "@/core/repositories/UserRepository";
import { faker } from "@faker-js/faker";

class InMemoryUserRepository implements UserRepository {
  private userCount = 100;
  private users: User[] = Array.from({ length: this.userCount }).map(() => {
    const name = faker.person.firstName();

    return User.create({
      name,
      email: faker.internet.email({ firstName: name }),
    });
  });

  async paginate(page: number, perPage: number): Promise<User[]> {
    const skip = (page - 1) * perPage;
    const users = this.users.slice(skip, skip + perPage);

    if (users.length === 0) throw new Error("Pagination error");

    return users;
  }
}

export { InMemoryUserRepository };
