import ERRORS from '../config/errors';
import Bank from '../models/bank';

class BankService {
  static actionCreate = async ({ name, bankName, noRekening }) => {
    const bank = await Bank.create({ name, bankName, noRekening });

    if (!name || !bankName || !noRekening) {
      throw new Error(ERRORS.INCOMPLETE_INPUT);
    }

    return bank;
  };

  static getAll = async () => {
    const bank = await Bank.find();

    if (!bank) {
      throw new Error(ERRORS.NOT_FOUND);
    }

    return bank;
  };
}

export default BankService;
