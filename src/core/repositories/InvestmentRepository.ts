import { Investment } from "../entities/investments";

interface InvestmentRepository {
  create(investment: Investment): Promise<Investment>;
  findById(id: string): Promise<Investment | undefined>;
  update(investment: Investment): Promise<Investment>;
  getInvestmentsBy(userId: string): Promise<Investment[]>;
}

export { InvestmentRepository };
