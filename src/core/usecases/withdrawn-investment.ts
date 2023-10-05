import { Investment } from "../entities/investments";
import { InvestmentRepository } from "../repositories/InvestmentRepository";

class WithdrawnInvestment {
  constructor(private readonly investmentRepository: InvestmentRepository) {}

  async execute(id: string): Promise<Investment> {
    const investment = await this.investmentRepository.findById(id);

    if (!investment) {
      throw new Error("Investment not found");
    }

    if (investment.status === "withdrawn") {
      throw new Error("Investment already withdrawn");
    }

    investment.withdraw();

    return investment;
  }
}

export { WithdrawnInvestment };
