import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO{
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

interface reduceFunction {
  accumulator: number;
  currentValue: number;
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
    const income = this.transactions.find(transaction => (transaction.type === "income"))
    const outcome = this.transactions.find(transaction => (transaction.type === "outcome"))
    const reducer = ({accumulator, currentValue}:reduceFunction) => accumulator + currentValue;

    console.log(income.reduce(reducer));
    // return this.getBalance(income, outcome, total)
    // return this.getBalance({income, outcome, total});
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
