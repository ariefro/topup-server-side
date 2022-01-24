import ERRORS from '../config/errors';
import Bank from '../models/bank';
import Payment from '../models/payment'

class PaymentService {
  static create = async ({ type, banks }) => {
    const payment = await Payment.create({ type, banks });
    if (!type || !banks) {
      throw new Error(ERRORS.INCOMPLETE_INPUT);
    }

    return payment;
  };

  static getBanks = async () => {
    const banks = await Bank.find();
    if (!banks) {
      throw new Error(ERRORS.NOT_FOUND);
    }

    return banks;
  };
}

export default PaymentService;
