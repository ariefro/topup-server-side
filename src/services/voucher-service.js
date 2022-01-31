import ERRORS from '../config/errors';
import Voucher from '../models/voucher';

class VoucherService {
  static createVoucher = async ({ name, category, nominals }) => {
    if (!name || !category || !nominals) {
      throw new Error(ERRORS.INCOMPLETE_INPUT);
    }
    const voucher = await Voucher.create({ name, category, nominals });

    return voucher;
  };

  static getAllVoucher = async () => {
    const voucher = await Voucher.find().populate('category').populate('nominals');

    return voucher;
  };

  static getVoucherById = async ({ id }) => {
    const voucher = await Voucher.findOne({ _id: id });

    if (!voucher) {
      throw new Error(ERRORS.NOT_FOUND);
    }

    return voucher;
  };

  static updateVoucher = async ({
    id,
    name,
    category,
    nominals,
  }) => {
    const voucher = await Voucher.findOneAndUpdate({
      _id: id,
    }, { name, category, nominals });

    if (!name || !category || !nominals) {
      throw new Error(ERRORS.INCOMPLETE_INPUT);
    }

    return voucher;
  };

  static deleteVoucher = async ({ id }) => {
    const voucher = await Voucher.findByIdAndDelete({ _id: id });
    if (!voucher) {
      throw new Error(ERRORS.NOT_FOUND);
    }

    return voucher;
  };

  static updateStatusVoucher = async ({ id, status }) => {
    const voucher = await Voucher.findOneAndUpdate({
      _id: id,
    }, { status });

    return voucher;
  };
}

export default VoucherService;
