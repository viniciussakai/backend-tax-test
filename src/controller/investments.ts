import { ViewInvestment } from "@/core/usecases/view-investment";
import { InMemoryInvestmentRepository } from "@/infra/repositories/InMemoryInvestmentRepository";

class InvestmentController {
  static async getInvestment(params: any, body: any) {
    const investmentRepository = new InMemoryInvestmentRepository();
    const sut = new ViewInvestment(investmentRepository);

    const searchInvestment = await sut.execute(params.id);
    return searchInvestment;
  }
}

export { InvestmentController };
