import { ViewInvestment } from "@/core/usecases/view-investment";
import { InMemoryInvestmentRepository } from "@/infra/repositories/InMemoryInvestmentRepository";
import { describe, expect, it } from "vitest";

describe("ViewInvestment", () => {
  it("should view an investment", async () => {
    const investmentRepository = new InMemoryInvestmentRepository();
    const sut = new ViewInvestment(investmentRepository);

    const searchInvestment = await sut.execute("seached-investment-id");

    expect(searchInvestment).toBeTruthy();
  });

  it("should not view an investment that does not exist", async () => {
    const investmentRepository = new InMemoryInvestmentRepository();
    const sut = new ViewInvestment(investmentRepository);

    const searchInvestment = sut.execute("invalid-investment-id");

    await expect(searchInvestment).rejects.toThrow("Investment not found");
  });

  it("should calculate gains", async () => {
    const investmentRepository = new InMemoryInvestmentRepository();
    const sut = new ViewInvestment(investmentRepository);

    const searchInvestment = await sut.execute("seached-investment-id");

    expect(searchInvestment.gains).approximately(109.3, 0.1);
  });
});
