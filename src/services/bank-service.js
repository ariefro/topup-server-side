import ERRORS from '../config/errors';
import Bank from '../models/bank';

class BankService {
  static actionCreate = async ({ name, nameBank, noRekening }) => {
    const bank = await Bank.create({ name, nameBank, noRekening });

    if (!name || !nameBank || !noRekening) {
      throw new Error(ERRORS.INCOMPLETE_INPUT);
    }

    return bank;
  };
}

export default BankService;
