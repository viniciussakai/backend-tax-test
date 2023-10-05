import { Investment } from "../entities/investments";
import { InvestmentRepository } from "../repositories/InvestmentRepository";

class ViewInvestment {
  constructor(private readonly investmentRepository: InvestmentRepository) {}

  async execute(id: string): Promise<Investment> {
    const investment = await this.investmentRepository.findById(id);

    if (!investment) {
      throw new Error("Investment not found");
    }

    return investment;
  }
}

export { ViewInvestment };
