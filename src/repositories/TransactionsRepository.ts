import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
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
    /*
    const incomeTransactions = this.transactions.filter(transaction => {
      return transaction.type === 'income';
    });

    const outcomeTransactions = this.transactions.filter(transaction => {
      return transaction.type === 'outcome';
    });
    */

    const income = this.transactions.reduce((sum, transaction) => {
      if (transaction.type === 'income') {
        return sum + transaction.value;
      }

      return sum;
    }, 0);

    const outcome = this.transactions.reduce((sum, transaction) => {
      if (transaction.type === 'outcome') {
        return sum + transaction.value;
      }

      return sum;
    }, 0);

    /*
    const income = incomeTransactions.reduce(
      (sum, transaction) => sum + transaction.value,
      0,
    );

    const outcome = outcomeTransactions.reduce(
      (sum, transaction) => sum + transaction.value,
      0,
    );
    */

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
