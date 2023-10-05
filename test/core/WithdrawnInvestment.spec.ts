import { WithdrawnInvestment } from "@/core/usecases/withdrawn-investment";
import { InMemoryInvestmentRepository } from "@/infra/repositories/InMemoryInvestmentRepository";
import { describe, expect, it } from "vitest";

describe("withdraw a Investment", () => {
  it("should withdraw a Investment", async () => {
    const investmentRepository = new InMemoryInvestmentRepository();
    const sut = new WithdrawnInvestment(investmentRepository);

    const searchInvestment = await sut.execute("seached-investment-id");
    expect(searchInvestment.withdrawnAmount).approximately(1089.08, 0.1);
  });

  it("should not withdraw a Investment that does not exist", async () => {
    const investmentRepository = new InMemoryInvestmentRepository();
    const sut = new WithdrawnInvestment(investmentRepository);

    const searchInvestment = sut.execute("invalid-investment-id");
    await expect(searchInvestment).rejects.toThrow("Investment not found");
  });

  it("should not withdraw a Investment with already withdrawn", async () => {
    const investmentRepository = new InMemoryInvestmentRepository();
    const sut = new WithdrawnInvestment(investmentRepository);

    const searchInvestment = sut.execute("already-withdrawn-investment-id");
    await expect(searchInvestment).rejects.toThrow(
      "Investment already withdrawn"
    );
  });

  it("should calculate gains", async () => {
    const investmentRepository = new InMemoryInvestmentRepository();
    const sut = new WithdrawnInvestment(investmentRepository);

    const searchInvestment = await sut.execute("seached-investment-id");
    expect(searchInvestment.gains).approximately(109.3, 0.1);
  });
});
