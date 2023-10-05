import { ListUsers } from "@/core/usecases/list-users";
import { InMemoryUserRepository } from "@/infra/repositories/InMemoryUserRepository";
import { describe, expect, it } from "vitest";

describe("ListUser", () => {
  it("should list an user", async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new ListUsers(userRepository);

    const listedUsers = await sut.execute(1, 10);
    expect(listedUsers.length).toBe(10);
  });

  it("should not list a page that does not exist", async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new ListUsers(userRepository);

    const listedUsers = sut.execute(100, 10);
    await expect(listedUsers).rejects.toThrow("Pagination error");
  });
});
