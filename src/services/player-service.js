import ERRORS from '../config/errors';
import Category from '../models/category';
import Voucher from '../models/voucher';

class PlayerService {
  static getVouchers = async () => {
    const players = await Voucher.find().populate('category').select('_id name status category thumbnail');

    if (!players) {
      throw new Error(ERRORS.NOT_FOUND);
    }

    return players;
  };

  static detailPage = async ({ id }) => {
    const voucher = await Voucher.findOne({ _id: id })
      .populate('category')
      .populate('nominals')
      .populate('user', '_id name phoneNumber');

    if (!voucher) {
      throw new Error(ERRORS.NOT_FOUND);
    }

    return voucher;
  };

  static getCategories = async () => {
    const category = await Category.find();

    if (!category) {
      throw new Error(ERRORS.NOT_FOUND);
    }

    return category;
  };
}

export default PlayerService;
