import { Investment } from "@/core/entities/investments";
import { InvestmentRepository } from "@/core/repositories/InvestmentRepository";

class InMemoryInvestmentRepository implements InvestmentRepository {
  investments: Investment[];

  constructor() {
    this.investments = [
      Investment.create(
        {
          ownerID: "some-user-id",
          initialAmount: 1000,
          createdAt: new Date("2022-01-01"),
        },
        "seached-investment-id"
      ),

      Investment.create(
        {
          ownerID: "some-user-id",
          initialAmount: 1000,
          createdAt: new Date("2022-01-01"),
          status: "withdrawn",
        },
        "already-withdrawn-investment-id"
      ),
    ];
  }

  async create(investment: Investment) {
    this.investments.push(investment);
    return investment;
  }

  async findById(id: string) {
    const investment = this.investments.find(
      (investment) => investment.id === id
    );

    return investment;
  }

  async update(investment: Investment) {
    const investmentIndex = this.investments.findIndex(
      (investment) => investment.id === investment.id
    );

    this.investments[investmentIndex] = investment;

    return investment;
  }

  async getInvestmentsBy(userId: string) {
    const investments = this.investments.filter(
      (investment) => investment.ownerID === userId
    );

    return investments;
  }
}

export { InMemoryInvestmentRepository };
