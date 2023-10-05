import { differenceInMonths } from "date-fns";
import { Entity } from "./entity";

interface InvestmentProps {
  ownerID: string;
  initialAmount: number;
  gains?: number;
  balance?: number;
  createdAt: Date;
  status?: string;
  withdrawnAt?: Date;
  withdrawnAmount?: number;
  tax?: number;
}

export class Investment extends Entity<InvestmentProps> {
  private FIXED_INTEREST_RATE = 0.0052;

  private constructor(props: InvestmentProps, id?: string) {
    super(props, id);
  }

  public static create(props: InvestmentProps, id?: string): Investment {
    const investment = new Investment(props, id);

    if (props.initialAmount <= 0) {
      throw new Error("Initial amount must be greater than 0");
    }

    if (!investment.isValidDate()) {
      throw new Error("Invalid date");
    }

    if (!props.status) {
      investment.props.status = "yielding";
    }

    return investment;
  }

  get withdrawnAmount(): number {
    return this.props.withdrawnAmount || 0;
  }

  get balance(): number {
    !this.props.balance && this.calculateGains(this.FIXED_INTEREST_RATE);
    return this.props.balance || 0;
  }

  get gains(): number {
    !this.props.gains && this.calculateGains(this.FIXED_INTEREST_RATE);
    return this.props.gains || 0;
  }

  get ownerID(): string {
    return this.props.ownerID;
  }

  get initialAmount(): number {
    return this.props.initialAmount;
  }

  get status(): string {
    return this.props.status || "";
  }

  get monthsAfterCreation(): number {
    const now = new Date();
    const createdAt = this.props.createdAt;
    const diference = differenceInMonths(now, createdAt);
    return diference;
  }

  get tax(): number {
    if (this.monthsAfterCreation >= 24) {
      return 0.15;
    } else if (this.monthsAfterCreation >= 12) {
      return 0.185;
    } else {
      return 0.225;
    }
  }

  withdraw() {
    this.props.status = "withdrawn";
    this.props.withdrawnAt = new Date();

    if (!this.gains) {
      this.calculateGains(this.FIXED_INTEREST_RATE);
    }

    this.props.tax = this.tax;
    this.props.withdrawnAmount = this.balance - this.gains * this.tax;
  }

  calculateGains(interestRate: number) {
    this.props.balance =
      this.props.initialAmount *
      Math.pow(1 + interestRate, this.monthsAfterCreation);

    this.props.gains = this.props.balance - this.props.initialAmount;
  }

  private isValidDate() {
    const date = this.props.createdAt;
    const now = new Date();

    if (date > now) {
      return false;
    }

    return true;
  }
}
