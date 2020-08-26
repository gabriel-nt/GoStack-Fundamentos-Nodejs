import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((total, item) => {
      if (item.type === 'income') {
        return total + item.value;
      }

      return total;
    }, 0);

    const outcome = this.transactions.reduce((total, item) => {
      if (item.type === 'outcome') {
        return total + item.value;
      }

      return total;
    }, 0);

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, type, value }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
