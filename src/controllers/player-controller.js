import PlayerService from '../services/player-service';
import VoucherService from '../services/voucher-service';

class PlayerController {
  static landingPage = async (req, res) => {
    try {
      const voucher = await PlayerService.getVouchers();

      console.log(voucher);

      res.status(200).json(voucher);
    } catch (err) {
      console.log(err);
    }
  };
}

export default PlayerController;
