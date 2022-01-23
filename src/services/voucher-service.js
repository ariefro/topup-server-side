import ERRORS from '../config/errors';
import Voucher from '../models/voucher';

class VoucherService {
  static createVoucher = async ({ name, category, nominal }) => {
    if (!name || !category || !nominal) {
      throw new Error(ERRORS.INCOMPLETE_INPUT);
    }
    const voucher = await Voucher.create({ name, category, nominal });

    return voucher;
  };

  static getAllVoucher = async () => {
    const voucher = await Voucher.find().populate('category').populate('nominal');

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
    nominal,
  }) => {
    const voucher = await Voucher.findOneAndUpdate({
      _id: id,
    }, { name, category, nominal });

    if (!name || !category || !nominal) {
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
}

export default VoucherService;
