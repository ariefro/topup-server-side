import ERRORS from '../config/errors';
import Transaction from '../models/transaction';

class TransactionService {
  static getTransaction = async () => {
    const transaction = await Transaction.find().populate('player');

    if (!transaction) {
      throw new Error(ERRORS.NOT_FOUND);
    }

    return transaction;
  };

  static updateStatusTransaction = async ({ id, status }) => {
    const transaction = await Transaction.findByIdAndUpdate({
      _id: id,
    }, { status });

    return transaction;
  };
}

export default TransactionService;
