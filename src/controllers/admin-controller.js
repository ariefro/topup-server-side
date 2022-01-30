import Player from '../models/player';
import Transaction from '../models/transaction';
import Voucher from '../models/voucher';
import Category from '../models/category';

class AdminController {
  static dashboardView = async (req, res) => {
    try {
      const transaction = await Transaction.countDocuments();
      const voucher = await Voucher.countDocuments();
      const player = await Player.countDocuments();
      const category = await Category.countDocuments();

      res.render('admin/dashboard', {
        name: req.session.user.name,
        title: 'Dashboard',
        count: {
          transaction,
          voucher,
          category,
          player,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export default AdminController;
