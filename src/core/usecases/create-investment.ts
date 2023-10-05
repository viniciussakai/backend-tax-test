import { Investment } from "../entities/investments";
import { InvestmentRepository } from "../repositories/InvestmentRepository";

export default class CreateInvestment {
  constructor(private readonly investmentRepository: InvestmentRepository) {}

  async execute(ownerID: string, initialAmount: number, createdAt: Date) {
    const investment = Investment.create({
      ownerID,
      initialAmount,
      createdAt,
    });

    await this.investmentRepository.create(investment);

    return investment;
  }
}
