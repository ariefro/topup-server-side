import ERRORS from '../config/errors';
import Voucher from '../models/voucher';

class PlayerService {
  static getVouchers = async () => {
    const players = await Voucher.find().populate('category').select('_id name status category thumbnail');

    if (!players) {
      throw new Error(ERRORS.NOT_FOUND);
    }

    return players;
  };
}

export default PlayerService;
