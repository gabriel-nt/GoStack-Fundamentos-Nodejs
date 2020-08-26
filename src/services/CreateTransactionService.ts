import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw new Error('Type not permited');
    }

    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      if (value > balance.total) {
        throw new Error(
          'Invalid create outcome transaction without a valid balance',
        );
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
