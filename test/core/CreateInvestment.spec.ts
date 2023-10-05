import CreateInvestment from "@/core/usecases/create-investment";
import { InMemoryInvestmentRepository } from "@/infra/repositories/InMemoryInvestmentRepository";
import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";

describe("CreateInvestment", () => {
  it("should create an investment", async () => {
    const investmentRepository = new InMemoryInvestmentRepository();
    const sut = new CreateInvestment(investmentRepository);

    const createdInvestment = await sut.execute(
      "any_owner_id",
      1000,
      new Date("2021-01-01")
    );

    expect(createdInvestment).toBeTruthy();
  });

  it("should not create an investment with initial amount less than 0", async () => {
    const investmentRepository = new InMemoryInvestmentRepository();
    const sut = new CreateInvestment(investmentRepository);

    const createdInvestment = sut.execute(
      "any_owner_id",
      -1000,
      new Date("2021-01-01")
    );

    await expect(createdInvestment).rejects.toThrow(
      "Initial amount must be greater than 0"
    );
  });

  it("should not create an investment with invalid date", async () => {
    const investmentRepository = new InMemoryInvestmentRepository();
    const sut = new CreateInvestment(investmentRepository);

    const createdInvestment = sut.execute(
      "any_owner_id",
      1000,
      faker.date.future()
    );

    await expect(createdInvestment).rejects.toThrow("Invalid date");
  });

  it("should create an investment with status yielding", async () => {
    const investmentRepository = new InMemoryInvestmentRepository();
    const sut = new CreateInvestment(investmentRepository);

    const createdInvestment = await sut.execute(
      "any_owner_id",
      1000,
      new Date("2021-01-01")
    );

    expect(createdInvestment.status).toBe("yielding");
  });
});
